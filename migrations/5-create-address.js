'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users"
<<<<<<< HEAD:migrations/5-create-address.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240223071632-create-address.js
      },
      address: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isUsed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};