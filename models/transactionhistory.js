'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    static associate(models) {
      TransactionHistory.belongsTo(models.User)
    }
  };
  TransactionHistory.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL cannot be empty'
        },
        isUrl: {
          args: true,
          msg: 'Input should be an URL'
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Total Price cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Total Price should be a number'
        },
        checkTotalPrice(price) {
          if(price < 0) throw new Error('Total Price cannot be minus')
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
    modelName: 'TransactionHistory',
  });
  return TransactionHistory;
};