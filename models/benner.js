'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Benner.init({
    banner_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tidak boleh kosong'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'tidak boleh kosong'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user =>{
        let setStatus = 'aktiv'
        user.status =setStatus
      }
    },
    sequelize,
    modelName: 'Benner',
  });
  return Benner;
};