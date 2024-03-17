'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Merchants', {
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
<<<<<<<< HEAD:migrations/3-create-merchant.js
        }
========
        },
>>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240220152600-create-merchant.js
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.ARRAY(Sequelize.JSON)
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
    await queryInterface.dropTable('Merchants');
  }
};
