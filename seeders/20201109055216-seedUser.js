'use strict';

const users = require('../json/users.json')
const { encryptPassword } = require('../helpers/bcrypt')

users.forEach( user => {
  user.password = encryptPassword(user.password)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
  }
}