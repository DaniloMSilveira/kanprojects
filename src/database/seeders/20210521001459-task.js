'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Teste',
          sprint_id: 1,
          status: 'PENDENTE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
