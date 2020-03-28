'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ExternalEntries', [{
        last_page: 1,
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ExternalEntries', null, {})

};