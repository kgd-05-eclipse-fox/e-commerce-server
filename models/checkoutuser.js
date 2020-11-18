'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckOutUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CheckOutUser.belongsTo(models.User)
      CheckOutUser.belongsTo(models.Product)
    }
  };
  CheckOutUser.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'not Empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'not Empty'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'not Empty'
        }
      }
    },
    total: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'not Empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CheckOutUser',
  });
  return CheckOutUser;
};