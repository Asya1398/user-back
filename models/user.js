'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `bhr gtr/index` file will call this method automatically.
     */
    static associate(models) {
      const { Post } = models;
      User.hasMany(Post, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }

  User.init(
    {
      firstName: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
