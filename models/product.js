'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
      Product.belongsToMany(models.User, {
        through: models.History
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Name can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Name can't be empty`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `URL can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `URL can't be empty`
        },
        isUrl: {
          args: true,
          msg: `Must be an url format`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Price can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Price can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error(`Price can't be a minus`)
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Stock can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `Stock can't be empty`
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number'
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error(`Stock can't be a minus`)
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