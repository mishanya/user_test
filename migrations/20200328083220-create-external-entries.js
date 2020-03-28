'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(
        'ExternalEntries', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            last_page: Sequelize.INTEGER,
            count: Sequelize.INTEGER,
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },



        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('ExternalEntries')
    //{
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    //}
};