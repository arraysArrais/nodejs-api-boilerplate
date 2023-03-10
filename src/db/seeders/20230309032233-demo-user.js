'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@admin.com',
      password: '$2b$10$7KNW/omVAhYUPhmtn8YQlO0Ar3/Ksr2Xj/F/7Gn9ANA9WuZGzA58y',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
