'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, {
        through: 'Carts',
        foreignKey: 'product_id'
      });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Product name required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image URL required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price required'
        },
        min: {
          args: [0],
          msg: 'Price must not be lower than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock required'
        },
        min: {
          args: [0],
          msg: 'Stock must not be lower than 0'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please choose product category'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};