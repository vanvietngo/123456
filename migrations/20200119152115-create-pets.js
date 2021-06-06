'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING,
        // allowNull:true,
        validate:{
          notEmpty:true
        }
      },

      photoUrls: {
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull:false
      },
      status: {
        type:Sequelize.ENUM('available', 'pending', 'sold'),
        defaultValue:'available'
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
    await queryInterface.dropTable('Pets');
  }
};