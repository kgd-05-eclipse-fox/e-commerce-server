'use strict';
const BcryptApp = require('../helper/bcrypt.js')
const {
  Model
} = require('sequelize');
const { use } = require('../routers/index.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { through: 'ProductUsers' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email atau Password tidak valid'
        },
        notEmpty: {
          args: true,
          msg: 'Email Tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email atau Password tidak valid'
        },
        min: {
          args: [6],
          msg: 'Password minimal 6 karakter'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user=>{
        let hashPassword = BcryptApp.hashPassword(user.password)
        user.password = hashPassword

        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};