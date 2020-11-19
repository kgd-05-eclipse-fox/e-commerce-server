'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'product_id'
      })
    }
  };
  Wishlist.init({
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Missing user id'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Missing product id'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};