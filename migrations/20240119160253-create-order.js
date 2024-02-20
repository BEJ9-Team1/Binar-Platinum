'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users"
        },
      },
      item_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Items"
        },
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Sellers"
        },
      },
      shipment_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Shipments"
        },
      },
      total_qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      isPaid: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};