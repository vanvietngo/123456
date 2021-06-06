'use strict';
const {
  Model, INTEGER, STRING
} = require('sequelize');
// const { validator } = require('sequelize/types/lib/utils/validator-extras');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address,{foreignKey:'UserId',onDelete: 'CASCADE',})
      User.hasMany(models.Order,{
        foreignKey:'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,  // phai co attribute fistname cho request
      validate:{
        notEmpty:true // phai co ki tu gui di
      }
      },
      lastName: {
      type: DataTypes.STRING,
      allowNull:false,  // phai co attribute fistname cho request
      validate:{
        notEmpty:true // phai co ki tu gui di
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:true,
      validate:{
        isEmail:true,
        notEmpty:false
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,  // phai co attribute fistname cho request
      validate:{
        notEmpty:true // phai co ki tu gui di
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    role: {
      type:DataTypes.STRING,
      defaultValue: "user"
    }
  }, {
    sequelize,
    modelName: 'User',
    // tableName:'users'
  });
  return User;
};