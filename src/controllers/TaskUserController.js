const Yup = require('yup');

const User = require('../models/User');
const Task = require('../models/Task');
const TaskUsers = require('../models/TaskUsers');

const AppError = require('../errors/AppError');

class TaskUsersController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      task_id: Yup.number()
        .required(),
      user_id: Yup.number()
        .required()
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao cadastrar usuario na task',err.errors);
    }

    const { task_id, user_id } = req.body;

    const taskExists = await Task.findOne({ where: { id: task_id } });

    if (!taskExists) {
      throw new AppError('Erro ao cadastrar usuario na task','Task não foi encontrado.');
    }

    const userExists = await User.findOne({ where: { id: user_id } });

    if (!userExists) {
      throw new AppError('Erro ao cadastrar usuario na task','User não foi encontrado.');
    }

    try {
      const taskUsers = await TaskUsers.create({task_id, user_id});

      return res.json({
        status: "success",
        taskUsers: {
          id: taskUsers.id,
          user_id,
          task_id
        }
      });
    } catch (err) {
      throw new AppError('Erro ao cadastrar usuario na task',err);
    } 
  }

  async delete(req, res) {
    const { id } = req.params;
    const taskUsers = await TaskUsers.findOne({ where: { id } });

    if (!taskUsers) {
      throw new AppError('Erro ao deletar usuario da task','Usuario não esta cadastrado nessa task.');
    }

    try {
      await taskUsers.destroy();

      return res.json({
        status: "success",
        taskUsers
      });
    } catch(err) {
      throw new AppError('Erro ao deletar usuario da task',err);
    }
  }
}

module.exports = new TaskUsersController();