'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('petTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PetId: {
        type:Sequelize.INTEGER,
        references: {
          model: 'Pets', // 'Movies' would also work
          key: 'id'
        },
      validate:{
        notEmpty:true
      },
        onUpdate: 'cascade',
        onDelete: 'CASCADE',
      },
      TagId:{
        type:Sequelize.INTEGER,
        references: {
          model: 'Tags', // 'Movies' would also work
          key: 'id'
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
    await queryInterface.dropTable('petTags');
  }
};