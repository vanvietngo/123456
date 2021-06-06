'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Pet, {
        foreignKey: 'CategoryId',
        through: 'petCategories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

    }
    // toJSON() {
    //   return {
    //     ...this.get(),
    //     updatedAt: undefined,
    //     createdAt: undefined,
    //     petCategories: undefined
    //   }
    // }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};