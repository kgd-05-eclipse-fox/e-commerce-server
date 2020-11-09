'use strict';
const { validate } = require('@babel/types');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
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
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Price should be a number'
        },
        checkPrice(price) {
          if(price < 0) throw new Error('Price cannot be minus')
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Stock should be a number'
        },
        checkStock(stock) {
          if(stock < 0) throw new Error('Stock cannot be minus')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};