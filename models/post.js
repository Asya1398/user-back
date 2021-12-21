'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      const { User } = models;
      Post.belongsTo(User, {
        foreignKey: {
          allowNull: false,
          primaryKey: 'id',
        },
      });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
