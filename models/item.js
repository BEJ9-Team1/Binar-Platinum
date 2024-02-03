'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Order, {
        foreignKey: "item_id",
        sourceKey: "id"
      })
    }
  }
  Item.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    Qty: {
     type: DataTypes.INTEGER,
     allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
     }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};