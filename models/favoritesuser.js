'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoritesUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavoritesUser.belongsTo(models.User)
      FavoritesUser.belongsTo(models.Product)
    }
  };
  FavoritesUser.init({
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
    }
  }, {
    sequelize,
    modelName: 'FavoritesUser',
  });
  return FavoritesUser;
};