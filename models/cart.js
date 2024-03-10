'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartItem, {
        foreignKey: "cartId",
        sourceKey: "id",
        as:'Cartitem'
      });
      Cart.belongsTo(models.User,{
        foreignKey:"userId",
        sourceKey:"id"
      })
    }
  }
  Cart.init({
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};