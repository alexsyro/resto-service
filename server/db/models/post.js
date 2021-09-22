const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Staff }) {
      // define association here
      // На одной должности может быть много людей.
      Post.hasMany(Staff);
    }
  }
  Post.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.ENUM('Администратор', 'Менеджер', 'Официант', 'Бармен', 'Повар'),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
