'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: models.Cart
      })
      User.hasMany(models.History)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        },
        len: {
          args: [4,10],
          msg: 'Password must be between four and ten character'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (instance, options) => {
    instance.role = 'customer'
  })

  User.addHook('beforeCreate', (instance, options) => {
    let hashedPassword = hashPassword(instance.password)
    instance.password = hashedPassword
  })
  return User;
};