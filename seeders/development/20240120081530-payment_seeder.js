'use strict';
const datadAdmin = require('../../databases/masterdata/development/payment.json')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = datadAdmin.map((eachDatadAdmin) => {
      eachDatadAdmin.id = uuidv4();
      eachDatadAdmin.createdAt = new Date();
      eachDatadAdmin.updatedAt = new Date();
      return eachDatadAdmin
    })
    await queryInterface.bulkInsert('Payments', insert)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Payments', null, { truncate: true, restartIdentity: true })
  }
};
