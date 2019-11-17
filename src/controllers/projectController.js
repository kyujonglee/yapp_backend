import { Project, InterviewQuestion, sequelize } from "../models";
import message from "../message";

export const findProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createAt", "DESC"]],
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
      order: [["viewCnt", "DESC"]],
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
    throw Error("cannot find project");
  }
};

export const getProject = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    const project = await Project.findOne({
      where: { projectId },
      include: [{ model: InterviewQuestion }],
      order: [[InterviewQuestion, "sn"]]
    });
    res.json({ project });
  } catch (error) {
    throw Error("cannot find project");
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
        role,
        step,
        expectedPeriod,
        location,
        interviewQuestions
      }
    } = req;
    const { projectId } = await Project.create(
      {
        title,
        content,
        role,
        step,
        userId,
        location,
        expectedPeriod,
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
    return res.json(true);
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
    if(!project) return res.json(false);
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
