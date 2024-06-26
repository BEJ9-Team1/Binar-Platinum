'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    address: DataTypes.STRING,
    name: DataTypes.STRING,
    isUsed: DataTypes.BOOLEAN
  }, 
  {    
    defaultScope: {
      attributes: { exclude: ['createdAt','deletedAt', 'updatedAt'] },
    },
    sequelize,
    modelName: 'Address',
    paranoid:true
  });
  return Address;
};