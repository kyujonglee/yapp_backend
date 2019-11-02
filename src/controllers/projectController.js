import { Project, InterviewQuestion } from '../models';
import message from '../message';

export const findProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createAt', 'DESC']],
      limit: 12
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error);
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
    console.log(error);
    throw Error('cannot find project');
  }
};

export const getProject = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    const project = await Project.findOne({
      where: { projectId },
      include: [{ model: InterviewQuestion }]
    });
    res.json({ project });
  } catch (error) {
    console.log(error);
    throw Error('cannot find project');
  }
};

export const enrollProject = async (req, res) => {
  try {
    const {
      user: { userId },
      body: { title, content, role, step, location }
    } = req;
    await Project.create({
      title,
      content,
      role,
      step,
      userId,
      location,
      thumbnailImage: req.file ? req.file.location : null
    });
    res.json(true);
  } catch (error) {
    throw Error(message.failEnrollProject);
  }
};
