'use strict';
const BcryptApp = require('../helper/bcrypt.js')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dataAdmin = [
      {
        email: "admin@mail.com",
        password: BcryptApp.hashPassword("1234"),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "customer@mail.com",
        password: BcryptApp.hashPassword("1234"),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    await queryInterface.bulkInsert('Users', dataAdmin, {})
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
