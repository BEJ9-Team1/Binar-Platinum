'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Orders"
<<<<<<< HEAD:migrations/7-create-order-product.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240301155529-create-order-product.js
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Products"
<<<<<<< HEAD:migrations/7-create-order-product.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240301155529-create-order-product.js
      },
      qty: {
        type: Sequelize.INTEGER
      },
      subTotal: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('OrderProducts');
  }
};