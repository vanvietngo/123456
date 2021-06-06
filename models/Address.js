'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User,{
        foreignKey:'UserId',
        onDelete: 'CASCADE',
      })
    }
  };
  Address.init({
    street: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    zip: {
      type:DataTypes.STRING,
      allowNull:false
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};










