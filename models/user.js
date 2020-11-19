'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			// define association here
			User.belongsToMany(models.Product, {
				through: models.Cart
			})
    }
  };
  User.init({
    email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {msg: 'Email already registered'},
			validate: {
				notEmpty: {
					args: true,
					msg: 'Email cannot be blank'
				},
				isEmail: {
					args: true,
					msg: 'Inputed email is even not an Email'
				}
			}
		},
    password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Password cannot be blank'
				},
				len: {
					args: [4],
					msg: 'Password should be at least 4 characters'
				}
			}
		},
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
	});
	User.addHook('beforeCreate', instance => {
		const hashed = hashPassword(instance.password)
		instance.password = hashed
		if (instance.email === 'admin@mail.com') {
			instance.role = 'admin'
		} else {
			instance.role = 'user'
		}
	})
  return User;
};