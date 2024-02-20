'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipment.hasMany(models.Order, {
        foreignKey: "shipment_id",
        sourceKey: "id"
      })
    }
  }
  Shipment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    isDelivered: {
      type: DataTypes.STRING,
      allowNull: false,
     },
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};