'use strict';
const {hashPassword} = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      full_name: 'Admin',
      email: 'admin@mail.com',
      password: hashPassword('admin'),
      gender:'male',
      role:'admin',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  }
};
