'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Pet, {
        foreignKey: 'TagId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        through: 'petTag'
      })
    }
    // toJSON() {
    //   return {
    //     ...this.get(),
    //     updatedAt: undefined,
    //     createdAt: undefined,
    //     petTags: undefined
    //   }
    // }

  };
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};