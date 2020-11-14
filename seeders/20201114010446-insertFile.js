'use strict';
let admins = require('../files/admins.json');
admins.forEach(element => {
  element.createdAt = new Date();
  element.updatedAt = new Date();
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', admins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};