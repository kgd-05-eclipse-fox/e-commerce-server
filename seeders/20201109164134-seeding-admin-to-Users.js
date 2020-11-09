'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const admin = [
      {
        email: 'admin@mail.com',
        password: hashPassword('123456'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt : new Date()
      }
    ]
    return queryInterface.bulkInsert('Users', admin, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
