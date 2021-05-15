const Yup = require('yup');

const Project = require('../models/Project');
const User = require('../models/User');

const AppError = require('../errors/AppError');

class ProjectController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      title: Yup.string()
        .required(),
      description: Yup.string()
        .required(),
      leader_id: Yup.number()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao cadastrar o projeto',err.errors);
    }

    const { title, description, leader_id } = req.body;

    const userExists = await User.findOne({ where: { id: leader_id } });

    if (!userExists) {
      throw new AppError('Erro ao cadastrar o projeto','Lider informado não foi encontrado na lista de usuários.');
    }

    const projectExists = await Project.findOne({ where: { title } });
    if (projectExists) {
      throw new AppError('Erro ao cadastrar o projeto','Projeto já existente com esse título.');
    }

    try {
      const project = await Project.create({title, description, leader_id});
      return res.json({
        status: "success",
        project: {
          id: project.id,
          title
        }
      });
    } catch (err) {
      throw new AppError('Erro ao cadastrar o projeto',err);
    } 
  }

  async show(req, res) {
    try {
      const projects = await Project.findAll();

      return res.json({
        status: "success",
        projects
      });
    } catch(err) {
      throw new AppError('Erro ao listar os projetos',err);
    }
  }

  async update(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      description: Yup.string()
        .required(),
      leader_id: Yup.number()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao atualizar o projeto',err.errors);
    }

    const { description, leader_id } = req.body;
    const { id } = req.params;

    const userExists = await User.findOne({ where: { id: leader_id } });

    if (!userExists) {
      throw new AppError('Erro ao cadastrar o projeto','Lider informado não foi encontrado na lista de usuários.');
    }

    const project = await Project.findOne({ where: { id } });

    if (!project) {
      throw new AppError('Erro ao atualizar o projeto','Projeto não cadastrado.');
    }

    try {
      await project.update({ description, leader_id });

      return res.json({
        status: "success",
        project
      });
    } catch(err) {
      throw new AppError('Erro ao atualizar o projeto',err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const project = await Project.findOne({ where: { id } });

    if (!project) {
      throw new AppError('Erro ao procurar o projeto','Projeto não cadastrado.');
    }

    try {
      await project.destroy();

      return res.json({
        status: "success",
        project
      });
    } catch(err) {
      throw new AppError('Erro ao deletar o projeto',err);
    }
  }
}

module.exports = new ProjectController();