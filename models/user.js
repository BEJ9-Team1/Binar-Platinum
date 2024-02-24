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
        as: "address"
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeBulkCreate: (Users) => {
        Users.forEach((User) => {
          // to see the properties added by sequelize
          console.table(User);
          // now modify the "dataValues" property
          User.dataValues.password = bcrypt.hashSync(User.password, +process.env.SALT_ROUNDS);
        });
        return Users
      },
      beforeCreate: (User) => {
        User.password = bcrypt.hashSync(User.password, +process.env.SALT_ROUNDS);
        return User
      },
      beforeUpdate:async (user) => {
        if (user.password) {
          console.log(user.password);
          const salt =  +process.env.SALT_ROUNDS
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }

  });
  return User;
};