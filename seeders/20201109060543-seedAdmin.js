'use strict';
const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
          {
            username: 'admin',
            email: 'admin@mail.com',
            password: hashPassword('1234'),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            username: 'costumer',
            email: 'costumer@mail.com',
            password: hashPassword('costumer1234'),
            role: 'costumer',
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {})
  }
};
