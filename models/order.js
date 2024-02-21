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
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      }),
      Order.belongsTo(models.Item, {
        foreignKey: "item_id",
        as: "item"
      }),
      Order.belongsTo(models.Seller, {
        foreignKey: "seller_id",
        as: "seller"
      }),
      Order.belongsTo(models.Shipment, {
        foreignKey: "shipment_id",
        as: "shipment"
      })
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    user_id: DataTypes.UUID,
    item_id: DataTypes.UUID,
    seller_id: DataTypes.UUID,
    shipment_id: DataTypes.UUID,
    total_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
     },
    total_price:{
      type: DataTypes.FLOAT,
      allowNull: false,
     },
    isPaid: {
      type: DataTypes.STRING,
      allowNull: false,
     },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};