'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductUser.belongsTo(models.User)
      ProductUser.belongsTo(models.Product)
    }
  };
  ProductUser.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid Id'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid Id'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid Quantity'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.quantity = 1
      }
    },
    sequelize,
    modelName: 'ProductUser',
  });
  return ProductUser;
};