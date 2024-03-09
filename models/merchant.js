'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchant.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        sourceKey: 'id'
      }) //NOT WORKS, NEED RELATION TO GET MERCHANT ADDRESS
    }
  }
  Merchant.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    name: DataTypes.STRING,
    address: DataTypes.ARRAY(DataTypes.JSON),
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};