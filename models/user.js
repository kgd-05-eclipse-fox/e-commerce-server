'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        },
        isEmail: {
          args: true,
          msg: 'Please fill the email with email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        },
        len: {
          args: [6],
          msg: 'Password minimum is six characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true, 
          msg: 'Please fill the empty column'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', user => {
    user.role = 'customer'
  })

  User.addHook('beforeCreate', (user) => {
    user.password = hashPassword(user.password)
  })

  return User;
};