'use strict';
const dataShipment = require('../databases/masterdata/shipment.json')
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    const insert = dataShipment.map((eachdataShipment) => {
      eachdataShipment.id = uuidv4();
      eachdataShipment.createdAt = new Date();
      eachdataShipment.updatedAt = new Date();
      return eachdataShipment
    })
    await queryInterface.bulkInsert('Shipments', insert)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shipments', null, { truncate: true, restartIdentity: true })
  }
};
