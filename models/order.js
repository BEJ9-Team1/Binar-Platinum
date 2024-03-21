'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderProduct, {
        foreignKey: "orderId",
        sourceKey: "id",
        as: "orderProduct",
      })
    }
  }
  Order.init({
    userId: DataTypes.UUID,
    paymentMethodId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    expiredAt: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};