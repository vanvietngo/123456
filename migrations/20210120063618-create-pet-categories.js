'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('petCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PetId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Pets',
          key:'id'
        },
        validate:{
          notEmpty:true
        },
        onUpdate: 'cascade',
        onDelete: 'CASCADE',
      },
      CategoryId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Categories',
          key:'id'
        },
        validate:{
          notEmpty:true
        },
        onUpdate: 'cascade',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('petCategories');
  }
};