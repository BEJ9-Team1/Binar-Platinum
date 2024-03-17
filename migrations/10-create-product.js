'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      merchantId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   key: "id",
        //   model: "Merchants"
        // }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Categories"
<<<<<<< HEAD:migrations/10-create-product.js
        }
=======
        },
      },
      merchantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: "id",
          model: "Merchants"
        },
>>>>>>> 83799986f47cd61c8b239a21c2bd0143b978ed93:migrations/20240221044600-create-product.js
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};