'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsToMany(models.Category, {
        foreignKey: 'PetId',
        through: 'petCategories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      Pet.belongsToMany(models.Tag, {
        foreignKey: 'PetId',
        through: 'petTags',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      Pet.hasOne(models.Order,{
        foreignKey:"petId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
    // toJSON() {
    //   return {
    //     ...this.get(),
    //     updatedAt: undefined,
    //     createdAt: undefined,
    //     petTags: undefined,
    //     petCategories: undefined,
    //     petTag: undefined
    //   }
    // }
  };
  Pet.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    photoUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'pending', 'sold'),
      defaultValue: 'available'
    }
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};