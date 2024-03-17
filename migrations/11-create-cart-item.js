'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
<<<<<<< HEAD:migrations/11-create-cart-item.js
        // references: {
        //   key: "id",
        //   model: "Carts"
        // }
=======
        references: {
          key: "id",
          model: "Carts"
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240308151728-create-cart-item.js
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Products"
<<<<<<< HEAD:migrations/11-create-cart-item.js
        }
=======
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240308151728-create-cart-item.js
      },
      qty: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};