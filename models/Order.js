'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Pet,{
        foreignKey:'petId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      Order.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  };
  Order.init({
    userId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:true
      }
    },
    petId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:true
      }
    },
    quantity: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:true
      }
    },
    shipDate: {
      allowNull:false,
      type:DataTypes.STRING,
      validate:{
        notEmpty:true,
        isDate: true,  
      }
    },
    status: {
      type:DataTypes.ENUM('placed','approved','delivered'),
      defaultValue:'placed'
    },
    complete: {
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};