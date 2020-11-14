'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter product name',
					},
					notNull: {
						msg: 'Please enter product name',
					},
				},
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter image url',
					},
					notNull: {
						msg: 'Please enter image url',
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: {
						args: 1,
						msg: "Product price can't be zero or less",
					},
					notEmpty: {
						msg: 'Please enter product price',
					},
					notNull: {
						msg: 'Please enter product price',
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: {
						args: [0],
						msg: "Product stock can't be less than zero",
					},
					notNull: {
						msg: 'Please enter product stock',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Product',
		}
	)
	return Product
}
