const Sequelize = require('sequelize');
const dbConfig = require('../configs/database');

const sequelize = new Sequelize(dbConfig);

const User = require('../models/User');
const Project = require('../models/Project');
const Sprint = require('../models/Sprint');
const Task = require('../models/Task');
const TaskUsers = require('../models/TaskUsers');

const models = [User, Project, Sprint, Task, TaskUsers];

module.exports = {
  async connect() {
    try {
      await sequelize.authenticate();
      models.map(model => model.init(sequelize));

      console.log(`Conexão com ${dbConfig.database} estabelecida`);
    } catch (error) {
      console.log(error);
      console.log(`Não foi possível estabelecer a conexão com ${dbConfig.database}`);
    }  
  },

  async clouse() {
    await sequelize.close();
  }
}