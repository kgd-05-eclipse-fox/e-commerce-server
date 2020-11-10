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
			validate: {
				notEmpty: {
					args: true,
					msg: 'Name cannot be blank'
				}
			}
		},
    image_url: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					args: true,
					msg: 'URL cannot be blank'
				},
				isUrl: {
					args: true,
					msg: 'Should be an URL'
				}
			}
		},
    price: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Price cannot be blank'
				},
				isInt: {
					args: true,
					msg: 'Price should be number'
				},
				notMinus(price) {
					if(price < 0) throw new Error('Price cannot be minus')
				}
			}
		},
    stock: {
			type: DataTypes.INTEGER,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Stock cannot be blank'
				},
				isInt: {
					args: true,
					msg: 'Stock should be number'
				},
				notMinus(price) {
					if(price < 0) throw new Error('Stock cannot be minus')
				}
			}
		},
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};