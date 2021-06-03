'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User)
    }
  };
  History.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "UserId cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "UserId cannot be empty"
        }
      }
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Product cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Product cannot be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "URL cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "URL cannot be empty"
        },
        isUrl: {
          args: true,
          msg: "URL is not valid"
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
        checkPrice (price) {
          if(price < 0) {
            throw new Error ('Price must be greater than 0')
          }
        }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Quantity cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Quantity cannot be empty"
        },
        checkQty (qty) {
          if(qty < 0) {
            throw new Error ('Quantity must be greater than 0')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};