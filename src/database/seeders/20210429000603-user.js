'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Administrador',
          email: 'admin@kanprojects.com',
          password_hash: bcrypt.hashSync('123456', 8),
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Teste',
          email: 'teste@kanprojects.com',
          password_hash: bcrypt.hashSync('123456', 8),
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
