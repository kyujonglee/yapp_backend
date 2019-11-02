import { Project, InterviewQuestion } from '../models';

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
    const interviewQuestions = await InterviewQuestion.findOne({
      where: { projectId }
    });
    res.json({ interviewQuestions });
  } catch (error) {
    console.log(error);
    throw Error('cannot find project');
  }
};
