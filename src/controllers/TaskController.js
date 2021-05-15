const Yup = require('yup');

const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

const AppError = require('../errors/AppError');

class TaskController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      title: Yup.string()
        .required(),
      sprint_id: Yup.number()
        .required(),
      status: Yup.string()
        .required()
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao cadastrar a task',err.errors);
    }

    const { title, status, sprint_id } = req.body;

    const sprintExists = await Sprint.findOne({ where: { id: sprint_id } });

    if (!sprintExists) {
      throw new AppError('Erro ao cadastrar a task','Sprint não foi encontrado.');
    }

    try {
      const task = await Task.create({title, status, sprint_id});

      return res.json({
        status: "success",
        task: {
          id: task.id,
          title
        }
      });
    } catch (err) {
      throw new AppError('Erro ao cadastrar a task',err);
    } 
  }

  async show(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      sprint_id: Yup.number()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao listar as tasks',err.errors);
    }

    const { sprint_id } = req.body;
    const sprint = await Sprint.findOne({ where: { id: sprint_id } });

    if (!sprint) {
      throw new AppError('Erro ao listar as tasks','Sprint não encontrado.');
    }

    try {
      const tasks = await Task.findAll({ where: { sprint_id } });

      return res.json({
        status: "success",
        tasks
      });
    } catch (err) {
      throw new AppError('Erro ao listar as tasks',err);
    }
  }

  async update(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      status: Yup.string()
        .required()
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao atualizar a task',err.errors);
    }

    const { status } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      throw new AppError('Erro ao atualizar a task','Task não cadastrado.');
    }

    try {
      await task.update({ status });

      return res.json({
        status: "success",
        task
      });
    } catch(err) {
      throw new AppError('Erro ao atualizar a task',err);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });

    if (!task) {
      throw new AppError('Erro ao deletar a task','Task não cadastrada.');
    }

    try {
      await task.destroy();

      return res.json({
        status: "success",
        task
      });
    } catch(err) {
      throw new AppError('Erro ao deletar a task',err);
    }
  }
}

module.exports = new TaskController();