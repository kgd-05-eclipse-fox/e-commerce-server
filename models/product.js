'use strict';
const {
  Model, Error
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        },
        isInt: {
          args: true,
          msg: 'Price is must be in integer'
        },
        absoluteValidate(price) {
          if (price < 0) {
            throw new Error('Price is must be an absolut number')
          }
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the empty column'
        },
        isInt: {
          args: true,
          msg: 'Stock is must be in integer'
        },
        absoluteValidate(stock) {
          if (stock < 0) {
            throw new Error('Stock is must be an absolut number')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};