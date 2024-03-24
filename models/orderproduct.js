'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderProduct.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'productId',
        sourceKey: 'id',
        onUpdate:"cascade",
        onDelete:"cascade"
      })
      OrderProduct.belongsTo(models.Order, {
        as: 'order',
        foreignKey: 'orderId',
        sourceKey: 'id',
        onUpdate:"cascade",
        onDelete:"cascade"
      })
    }
  }
  OrderProduct.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.UUID,
    qty: DataTypes.INTEGER,
    subTotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};