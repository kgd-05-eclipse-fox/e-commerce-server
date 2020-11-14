'use strict'
const { hash } = require('../helpers/bcrypt')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'admin@gmail.com',
					password: hash('sudosudo'),
					role: 'admin',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null)
	},
}
