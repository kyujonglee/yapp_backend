import {
  Project,
  ProjectRecruitRole,
  Role,
  InterviewQuestion
} from '../models';

export const findProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createAt', 'DESC']],
      limit: 6
    });
    res.json({ projects });
  } catch (error) {
    throw Error(error);
  }
};

export const getProject = async (req, res) => {
  try {
    const {
      params: { projectId }
    } = req;
    let project = await Project.findOne({
      where: { projectId },
      include: [
        { model: ProjectRecruitRole, include: [{ model: Role }] },
        { model: InterviewQuestion }
      ]
    });
    project = {
      ...project.dataValues,
      projectRecruitRoles: project.projectRecruitRoles.map(item => ({
        id: item.id,
        roleId: item.roleId,
        name: item.role.name
      }))
    };
    res.json({ project });
  } catch (error) {
    console.log(error);
    throw Error('cannot find project');
  }
};
