'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.hasMany(models.Order, {
        foreignKey: "seller_id",
        sourceKey: "id"
      })
    }
  }
  Seller.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
     },
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};