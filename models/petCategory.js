'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      
    }
    // toJSON() {
    //   return { ...undefined }
    // }
  };
  petCategory.init({
    PetId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{ // reference need to name of table
        model:'Pets',
        key:'id'
      },
      validate:{
        notEmpty:true
      }
    },
    CategoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Categories',
        key:'id'
      },
      validate:{
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'petCategory',
  });
  return petCategory;
};