'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username:'admin',
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password:'admin',
      role:'admin',
      phone:'0994417896',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
