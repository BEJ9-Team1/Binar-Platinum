'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users"
<<<<<<< HEAD:migrations/6-create-order.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240301155510-create-order.js
      },
      paymentMethodId: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Payments"
<<<<<<< HEAD:migrations/6-create-order.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240301155510-create-order.js
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      expiredAt: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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