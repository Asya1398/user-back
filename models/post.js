'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `bhr gtr/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        DataTypes: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  Post.associate = (models) => {
    Post.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
