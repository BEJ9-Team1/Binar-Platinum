'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "address",
        onUpdate: 'cascade',
        onDelete: 'cascade',
      })//need relation to media
      User.hasMany(models.Media, {
        foreignKey: "parentId",
        sourceKey: "id",
        as: "UserImage",
        onUpdate: 'cascade',
        onDelete: 'cascade',
      })
      //include in return service get etc
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  },
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate:async (User) => {
        User.password = bcrypt.hashSync(User.password, +process.env.SALT_ROUNDS);
        return User
      },
      beforeUpdate:async (User) => {
        if (User.password) {
          const salt =  +process.env.SALT_ROUNDS
          User.password = bcrypt.hashSync(User.password, salt);
        }
      }
    }
  });
  return User;
};