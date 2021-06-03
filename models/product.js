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
      Product.belongsToMany(models.User, {
        through: models.Cart
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
          msg: "Field cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Field cannot be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Field cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Field cannot be empty"
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
          msg: "Field cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Field cannot be empty"
        },
        checkPrice (price) {
          if(price < 0) {
            throw new Error ('Price must be greater than 0')
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
          msg: "Field cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Field cannot be empty"
        },
        checkStock (stock) {
          if(stock < 0) {
            throw new Error ('Stock must be greater than 0')
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