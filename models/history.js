'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      // define association here
    }
  };
  History.init({
    UserId: DataTypes.INTEGER,
    product: DataTypes.JSON,
    totalQuantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};