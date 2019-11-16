import Sequelize from 'sequelize';
import { Project, InterviewQuestion, sequelize, ProjectQna } from '../models';
import message from '../message';

export const findProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createAt', 'DESC']],
      limit: 12
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error.message);
  }
};

export const findProjectsByPopularity = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['viewCnt', 'DESC']],
      limit: 6
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
      params: { projectId }
    } = req;
    const { Op } = Sequelize;
    const Qna = await Project.findOne({
      where: { projectId },
      include: [
        {
          model: ProjectQna,
          where: { parentId: { [Op.or]: [{ [Op.eq]: null }, { [Op.eq]: 0 }] } },
          include: [{ model: ProjectQna, as: 'answer' }],
          limit: 15,
          offset: 0,
          order: [['createAt', 'DESC']]
        }
      ]
    });
    res.json({ result: Qna });
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
      body: { offset }
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
