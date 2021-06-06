'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  petTag.init({
    PetId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Pets', // =>table name
        key: 'id'
      },
      validate:{
        notEmpty:true
      }
    },
    TagId:{
      type:DataTypes.INTEGER,
      references: {
        model: 'Tags', // =>table name
        key: 'id'
      },
      validate:{
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'petTag',
  });
  return petTag;
};

