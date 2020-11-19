'use strict';
const {
  hash
} = require('../helpers/encrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        first_name: 'bima',
        last_name: 'krishna',
        gender: 'male',
        email: 'admin@mail.com',
        password: hash('1234'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};