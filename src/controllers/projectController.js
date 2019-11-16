import Sequelize from 'sequelize';
import {
  Project,
  InterviewQuestion,
  sequelize,
  ProjectQna,
  ProjectKeyword,
  ProjectCart
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
    console.log(error);
    throw Error('cannot find project');
  }
};

export const enrollProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      user: { userId },
      body: { title, content, role, step, location, interviewQuestions }
    } = req;
    const { projectId } = await Project.create(
      {
        title,
        content,
        role,
        step,
        userId,
        location,
        thumbnailImage: req.file ? req.file.location : null
      },
      { transaction }
    );
    const parseInterviewQuestions = interviewQuestions.map(question => ({
      content: question.content,
      projectId
    }));
    await InterviewQuestion.bulkCreate(parseInterviewQuestions, {
      transaction
    });
    await transaction.commit();
    await res.json(true);
  } catch (error) {
    await transaction.rollback();
    throw Error(message.failEnrollProject);
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
    console.log(error);
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
    const projectQna = await ProjectQna.findAll({
      where: {
        projectId,
        parentId: { [Op.or]: [{ [Op.eq]: null }, { [Op.eq]: 0 }] }
      },
      include: [
        {
          model: ProjectQna,
          as: 'answer',
          required: false
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
    if (!parentId) parentId = null;
    if (projectId && content) {
      await ProjectQna.create({ projectId, userId, content, parentId });
      res.json(true);
    } else {
      res.json(false);
    }
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
    if (projectQna.userId === userId) {
      await ProjectQna.destroy({ where: { projectQnaId } });
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
    if (projectQna.userId === userId) {
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
    console.log(error);
    throw Error('cannot find projects');
  }
};
