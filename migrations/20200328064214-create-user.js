'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable(
        'Users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            first_name: Sequelize.STRING,
            last_name: Sequelize.STRING,
            email: Sequelize.STRING,
            avatar: Sequelize.TEXT,
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },



        }),

    down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
    //{
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    //}
};