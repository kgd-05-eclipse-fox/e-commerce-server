'use strict';
const { User } = require('../models')
const admin = require('../datas/admin.json');
const { response } = require('express');
admin[0].createdAt = new Date()
admin[0].updatedAt = new Date()
module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users', admin, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
