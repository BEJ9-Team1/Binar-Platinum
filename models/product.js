'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId',
        sourceKey: 'id'
      }),
      Product.belongsTo(models.Merchant, {
        as: 'merchant',
        foreignKey: 'merchantId',
        sourceKey: 'id'
      }),
      Product.hasMany(models.Media, {
        as: 'ProductImage',
        foreignKey: 'parentId',
        sourceKey: 'id'
      })
      
    }//need relation to media
    //include in return service get etc
  }
  //need relation to media
  //update product image with search fk parentId in media
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    merchantId: DataTypes.UUID,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true,

  });
  return Product;
};