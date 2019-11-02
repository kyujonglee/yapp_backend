import { Project } from '../models';

export const findProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createAt', 'DESC']],
      limit : 12
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error);
  }
};
