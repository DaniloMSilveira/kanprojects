const Yup = require('yup');

const Sprint = require('../models/Sprint');
const Project = require('../models/Project');

const AppError = require('../errors/AppError');

class SprintController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      title: Yup.string()
        .required(),
      project_id: Yup.number()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao cadastrar a sprint',err.errors);
    }

    const { title, project_id } = req.body;

    const projectExists = await Project.findOne({ where: { id: project_id } });

    if (!projectExists) {
      throw new AppError('Erro ao cadastrar a sprint','Projeto não foi encontrado.');
    }

    try {
      const sprint = await Sprint.create({title, project_id});

      return res.json({
        status: "success",
        sprint: {
          id: sprint.id,
          title
        }
      });
    } catch (err) {
      throw new AppError('Erro ao cadastrar a sprint',err);
    } 
  }

  async show(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      project_id: Yup.number()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao listar as sprints',err.errors);
    }

    const { project_id } = req.body;
    const project = await Project.findOne({ where: { id: project_id } });

    if (!project) {
      throw new AppError('Erro ao listar as sprints','Projeto não encontrado.');
    }

    try {
      const sprints = await Sprint.findAll({ where: { project_id } });

      return res.json({
        status: "success",
        sprints
      });
    } catch (err) {
      throw new AppError('Erro ao listar as sprints',err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const sprint = await Sprint.findOne({ where: { id } });

    if (!sprint) {
      throw new AppError('Erro ao deletar a sprint','Sprint não cadastrada.');
    }

    try {
      await sprint.destroy();

      return res.json({
        status: "success",
        sprint
      });
    } catch(err) {
      throw new AppError('Erro ao deletar a sprint',err);
    }
  }
}

module.exports = new SprintController();