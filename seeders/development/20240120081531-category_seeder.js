'use strict';
const {INTEGER } = require('sequelize');
const datadAdmin = require('../../databases/masterdata/development/category.json')
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = datadAdmin.map((eachDatadAdmin) => {
      eachDatadAdmin.createdAt = new Date();
      eachDatadAdmin.updatedAt = new Date();
      return eachDatadAdmin
    })
    await queryInterface.bulkInsert('Categories', insert)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, { truncate: true, restartIdentity: true })
  }
};
