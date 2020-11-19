'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCart extends Model {
    static associate(models) {
      UserCart.belongsTo(models.User)
      UserCart.belongsTo(models.Product)
    }
  };
  UserCart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'UserId should be a number'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'ProductId should be a number'
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Qty cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Qty should be a number'
        },
        checkQty(qty) {
          if (qty < 0) throw new Error('Qty cannot be minus')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserCart',
  });

  UserCart.addHook('beforeCreate', cart => {
    cart.qty = 1
  })

  return UserCart;
};