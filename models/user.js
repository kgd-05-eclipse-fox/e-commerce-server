'use strict';
const {
  Model
} = require('sequelize');
const Encrypt = require('../helpers/encrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, {
        through: 'Carts',
        foreignKey: 'user_id'
      })
      User.belongsToMany(models.Product, {
        through: 'Wishlists',
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Gender required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email has already registered'
      },
      validate: {
        notEmpty: {
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Email must be using email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Role required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = Encrypt.hash(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};