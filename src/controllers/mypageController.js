import { Project, Applicant, Role } from '../models';

export const getSupports = async (req, res) => {
  const { user } = req;
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Applicant,
          where: { userId: user.userId },
          include: [{ model: Role }]
        }
      ]
    });
    res.json(projects);
  } catch (error) {
    res.json(error);
  }
};
