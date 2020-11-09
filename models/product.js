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
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Image cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "Image URL invalid format"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Price cannot be empty"
        },
        min: {
          args: 1,
          msg: "Price cannot be 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Stock cannot be empty"
        },
        min: {
          args: 1,
          msg: "Stock cannot be 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};