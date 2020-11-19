'use strict';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
const { hashPassword } = require('../helpers/bcrypt')
const admin = [{
	email: process.env.ADMINEMAIL,
	password: hashPassword(process.env.ADMINPASSWORD),
	role: process.env.ADMINROLE,
	createdAt: new Date(),
	updatedAt: new Date()
}]
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
