import Sequelize from 'sequelize';
import { isNull } from '../utils';
import {
  Project,
  InterviewQuestion,
  sequelize,
  ProjectQna,
  ProjectKeyword,
  ProjectCart,
  User
} from '../models';
import message from '../message';

export const findProjects = async (req, res) => {
  try {
    const { user } = req;
    const projects = await Project.findAll({
      order: [['createAt', 'DESC']],
      limit: 12,
      include: [
        {
          model: ProjectCart,
          where: { userId: `${user ? user.userId : null}` },
          required: false
        }
      ]
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error.message);
  }
};

export const findProjectsByPopularity = async (req, res) => {
  try {
    const { user } = req;
    const projects = await Project.findAll({
      order: [['viewCnt', 'DESC']],
      limit: 6,
      include: [
        {
          model: ProjectCart,
          where: { userId: `${user ? user.userId : null}` },
          required: false
        }
      ]
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error.message);
  }
};

export const getProjectQuestion = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    const interviewQuestions = await InterviewQuestion.findAll({
      where: { projectId }
    });
    res.json({ interviewQuestions });
  } catch (error) {
    throw Error('cannot find project');
  }
};

export const getProject = async (req, res) => {
  try {
    const {
      params: { projectId },
      user
    } = req;
    const { Op } = Sequelize;
    const project = await Project.findOne({
      where: { projectId },
      include: [
        {
          model: ProjectQna,
          where: { parentId: { [Op.or]: [{ [Op.eq]: null }, { [Op.eq]: 0 }] } },
          include: [{ model: ProjectQna, as: 'answer' }],
          limit: 15,
          offset: 0,
          order: [['createAt', 'DESC']]
        },
        {
          model: ProjectCart,
          where: { userId: `${user ? user.userId : null}` },
          required: false
        }
      ]
    });
    res.json(project);
  } catch (error) {
    throw Error('cannot find project');
  }
};

export const enrollProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      user: { userId },
      body: {
        title,
        content,
        location,
        step,
        expectedPeriod,
        role,
        currentMember,
        keywords,
        interviewQuestions
      }
    } = req;
    if (
      isNull(
        title,
        content,
        location,
        step,
        expectedPeriod,
        role,
        currentMember
      )
    ) {
      return res.json({ projectId: null });
    }

    const { projectId } = await Project.create(
      {
        title,
        content,
        role,
        step,
        userId,
        location,
        expectedPeriod,
        currentMember,
        thumbnailImage: req.file ? req.file.location : null
      },
      { transaction }
    );

    if (keywords && keywords.length) {
      const parseKeywords = keywords.map(keywordId => ({
        projectId,
        keywordId
      }));
      await ProjectKeyword.bulkCreate(parseKeywords, { transaction });
    }

    if (interviewQuestions && interviewQuestions.length) {
      const parseInterviewQuestions = interviewQuestions.map(
        (question, idx) => ({
          sn: idx + 1,
          content: question.content,
          role: question.role,
          projectId
        })
      );
      await InterviewQuestion.bulkCreate(parseInterviewQuestions, {
        transaction
      });
    }
    await transaction.commit();
    return res.json({ projectId });
  } catch (error) {
    await transaction.rollback();
    throw Error(message.failEnrollProject);
  }
};

export const updateProject = async (req, res) => {
  let transaction;
  try {
    const {
      user: { userId },
      body: {
        title,
        content,
        location,
        step,
        expectedPeriod,
        role,
        currentMember,
        keywords,
        interviewQuestions
      },
      params: { projectId }
    } = req;

    const project = await Project.findOne({
      where: { projectId },
      include: [{ model: ProjectKeyword }, { model: InterviewQuestion }]
    });

    if (!project) return res.json({ projectId: null });
    if (project.userId !== userId) return res.json({ projectId: null });
    if (
      isNull(
        content,
        title,
        location,
        step,
        expectedPeriod,
        role,
        currentMember
      )
    ) {
      return res.json({ projectId: null });
    }

    transaction = await sequelize.transaction();

    await Project.update(
      {
        title,
        content,
        role,
        step,
        location,
        expectedPeriod,
        currentMember,
        thumbnailImage: req.file ? req.file.location : null
      },
      { where: { projectId } },
      { transaction }
    );

    if (project.projectKeywords && project.projectKeywords.length) {
      await ProjectKeyword.destroy({ where: { projectId } }, { transaction });
    }

    if (project.interviewQuestions && project.interviewQuestions.length) {
      await InterviewQuestion.destroy(
        { where: { projectId } },
        { transaction }
      );
    }

    if (keywords && keywords.length) {
      const parseKeywords = keywords.map(keywordId => ({
        projectId,
        keywordId
      }));
      await ProjectKeyword.bulkCreate(parseKeywords, { transaction });
    }
    if (interviewQuestions && interviewQuestions.length) {
      const parseInterviewQuestions = interviewQuestions.map(question => ({
        content: question.content,
        role: question.role,
        projectId
      }));
      await InterviewQuestion.bulkCreate(parseInterviewQuestions, {
        transaction
      });
    }
    await transaction.commit();
    return res.json({ projectId });
  } catch (error) {
    await transaction.rollback();
    throw Error('프로젝트를 수정하지 못했습니다.');
  }
};

export const updateProjectViewCnt = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    if (!projectId) return res.json(false);
    const project = await Project.findOne({ where: { projectId } });
    if (!project) return res.json(false);
    await Project.update(
      { viewCnt: project.viewCnt + 1 },
      { where: { projectId } }
    );
    return res.json(true);
  } catch (error) {
    throw Error(error.message);
  }
};

export const getProjectQna = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    let {
      query: { offset }
    } = req;
    const LIMIT = 15;
    if (!offset) offset = 0;
    else offset *= LIMIT;
    const { Op } = Sequelize;
    const userAttributes = [
      'userId',
      'email',
      'name',
      'location',
      'profileImage',
      'createAt',
      'keywords'
    ];
    const projectQna = await ProjectQna.findAll({
      where: {
        projectId,
        parentId: { [Op.or]: [{ [Op.eq]: null }, { [Op.eq]: 0 }] }
      },
      include: [
        {
          model: User,
          attributes: userAttributes
        },
        {
          model: ProjectQna,
          as: 'answer',
          required: false,
          include: [{ model: User, attributes: userAttributes }]
        }
      ],
      limit: LIMIT,
      offset,
      order: [['createAt', 'DESC']]
    });
    res.json({ projectQna });
  } catch (error) {
    throw Error(error.message);
  }
};

export const postProjectQna = async (req, res) => {
  try {
    const {
      params: { projectId },
      user: { userId },
      body: { content }
    } = req;
    let {
      body: { parentId }
    } = req;
    let qna;

    const project = await Project.findOne({ where: { projectId } });
    if (!project) return res.json(false);

    if (!parentId) {
      parentId = null;
    } else {
      qna = await ProjectQna.findOne({ where: { projectQnaId: parentId } });
    }
    if (projectId && content) {
      if (qna) {
        if (project.userId === userId || qna.userId === userId) {
          await ProjectQna.create({ projectId, userId, content, parentId });
          return res.json(true);
        }
      } else {
        await ProjectQna.create({ projectId, userId, content, parentId });
        return res.json(true);
      }
    }
    return res.json(false);
  } catch (error) {
    throw Error(error.message);
  }
};

export const removeProjectQna = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { projectQnaId }
    } = req;
    const projectQna = await ProjectQna.findOne({ where: { projectQnaId } });
    if (projectQna.userId === userId && !projectQna.isDelete) {
      await ProjectQna.update({ isDelete: true }, { where: { projectQnaId } });
      res.json(true);
    }
    return res.json(false);
  } catch (error) {
    throw Error(error.message);
  }
};

export const updateProjectQna = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { projectQnaId, content }
    } = req;
    const projectQna = await ProjectQna.findOne({ where: { projectQnaId } });
    if (projectQna.userId === userId && !projectQna.isDelete) {
      await ProjectQna.update({ content }, { where: { projectQnaId } });
      res.json(true);
    }
    return res.json(false);
  } catch (error) {
    throw Error(error.message);
  }
};

export const searchProject = async (req, res) => {
  try {
    const {
      body: { keywords }
    } = req;
    let {
      // eslint-disable-next-line prefer-const
      query: { term, offset, location }
    } = req;
    const { Op } = Sequelize;
    const LIMIT = 15;
    const { user } = req;
    if (!term) term = '';
    if (!offset) offset = 0;
    let condition = {
      where: {
        [Op.or]: [
          { title: { [Op.substring]: term } },
          { content: { [Op.substring]: term } }
        ]
      },
      limit: LIMIT,
      offset,
      order: [['createAt', 'DESC']]
    };
    let include = [
      {
        model: ProjectCart,
        where: { userId: `${user && user.userId ? user.userId : ''}` },
        required: false
      }
    ];
    if (keywords && keywords.length) {
      include = [
        ...include,
        {
          model: ProjectKeyword,
          where: { keywordId: { [Op.in]: keywords } }
        }
      ];
    }
    if (location) {
      condition = { ...condition, where: { ...condition.where, location } };
    }
    const projects = await Project.findAll({
      ...condition,
      include
    });
    res.json(projects);
  } catch (error) {
    throw Error('cannot find projects');
  }
};

export const enrollProjectCart = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { projectId }
    } = req;
    const project = await Project.findOne({ where: { projectId } });
    if (project) {
      const projectCart = await ProjectCart.findOne({
        where: { projectId, userId }
      });
      if (projectCart) {
        return res.json(false);
      }
      await ProjectCart.create({ title: project.title, projectId, userId });
      return res.json(true);
    }
    return res.json(false);
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteProjectCart = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { projectId }
    } = req;
    await ProjectCart.destroy({ where: { userId, projectId } });
    res.json(true);
  } catch (error) {
    res.json(false);
  }
};

export const projectDeadline = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { projectId }
    } = req;
    const project = await Project.findOne({ where: { projectId } });
    if (!project) return res.json(false);
    if (project.userId !== userId) return res.json(false);
    await Project.update({ isClosed: true }, { where: { projectId } });
    return res.json(true);
  } catch (error) {
    throw Error('Project 모집 마감이 정상적으로 작동하지 않았습니다.');
  }
};
