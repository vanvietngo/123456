'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,  // phai co attribute fistname cho request
        validate: {
          notEmpty: true // phai co ki tu gui di
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,  // phai co attribute fistname cho request
        validate: {
          notEmpty: true // phai co ki tu gui di
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,  // phai co attribute fistname cho request
        validate: {
          notEmpty: true // phai co ki tu gui di
        }
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "user"
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: true
        }
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
    await queryInterface.dropTable('Users');
  }
};