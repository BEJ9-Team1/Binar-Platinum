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
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `product name can't contain empty string`
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          msg : `category id can't contain empty string`
        },
        isNumeric : {
          args : true,
          msg: `category id only receive numeric value`
        }
      }
    },
    merchantId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    stock: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty : {
          msg : `qty can't contain empty value`
        },
        isNumeric : {
          args : true,
          msg: `qty only receive numeric value`
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate : {
        notEmpty : {
          msg : `price can't contain empty value`
        },
        isNumeric : {
          args : true,
          msg: `price only receive numeric value`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    paranoid : true,
    
  });
  return Product;
};