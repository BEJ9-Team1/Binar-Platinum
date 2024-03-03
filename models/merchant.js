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
      }),
      Merchant.hasMany(models.Address, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "address",
        onUpdate: 'cascade',
        onDelete: 'cascade',
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
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};