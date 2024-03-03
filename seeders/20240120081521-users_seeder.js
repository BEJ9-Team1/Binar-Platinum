'use strict';
const datadAdmin = require('../databases/masterdata/user.json')
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = datadAdmin.map((eachDatadAdmin) => {
      eachDatadAdmin.password = bcrypt.hashSync(eachDatadAdmin.password, +process.env.SALT_ROUNDS);
      eachDatadAdmin.createdAt = new Date();
      eachDatadAdmin.updatedAt = new Date();
      return eachDatadAdmin
    })
    await queryInterface.bulkInsert('Users', insert)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true })
  }
};
