'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

    }
  };
  User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: `Username can't be empty`
            },
            notEmpty: {
                args: true,
                msg: `Username can't be empty`
            },
            len: {
                args: [3, 15],
                msg: 'Username must be a minimal of 3 and a maximal of 15 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: `Email can't be empty`
            },
            notEmpty: {
                args: true,
                msg: `Email can't be empty`
            },
            isEmail: {
                args: true,
                msg: 'Must be a valid email format'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: `Password can't be empty`
            },
            notEmpty: {
                args: true,
                msg: `Password can't be empty`
            },
            len: {
                args: [6,20],
                msg: 'Password must be a minimal of 6 and a maximal of 20 characters'
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: `Role can't be empty`
            },
            notEmpty: {
                args: true,
                msg: `Role can't be empty`
            }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeValidate', (instance, option) => {
      if (!instance.role) {
          instance.role = 'customer'
      }
  })

  return User;
};