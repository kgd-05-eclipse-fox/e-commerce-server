'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        notMinus (val) {
          if (val < 0) {
            throw {msg: 'Quantity cannot be minus!'}
          }
        }
      }
    },
    checked_out: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.addHook('beforeCreate', instance => {
    instance.checked_out = false; 
    instance.qty = 1
  })
  return Cart;
};