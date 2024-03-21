'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.belongsTo(models.User,{
        foreignKey:"parentId",
        sourceKey:"id",
        as:"UserImage"
      })
      Media.belongsTo(models.Product,{
        foreignKey:"parentId",
        sourceKey:"id",
        as:"Productimage"
      })
    }
  }
  Media.init({
    url: DataTypes.STRING,
    publicId: DataTypes.STRING,
    parentId: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};