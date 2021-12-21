'use strict';
const { Model } = require('sequelize');
const { post } = require('../controllers');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { Post } = models;
      User.hasMany(Post, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  // User.hasMany(post, {
  //   foreignKey: 'userId',
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // });

  return User;
};
