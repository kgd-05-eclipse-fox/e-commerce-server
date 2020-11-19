'use strict';
const banners = require('../datas/banners.json')
banners.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Banners', banners, {})
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
    await queryInterface.bulkDelete('Banners', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
