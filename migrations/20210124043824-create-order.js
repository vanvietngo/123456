'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        validate:{
          notEmpty:true
        },
        references: {
          model: 'Users', // 'Movies' would also work
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      petId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        validate:{
          notEmpty:true
        },
        references: {
          model: 'Pets', // 'Movies' would also work
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull:false,
        type: Sequelize.INTEGER,
        validate:{
          notEmpty:true
        }
      },
      shipDate: {
        allowNull:false,
        type: Sequelize.DATE,
        validate:{
          notEmpty:true,
          isDate: true,  
        }
      },
      status: {
        type: Sequelize.ENUM('placed','approved','delivered '),
        defaultValue:'placed'
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};