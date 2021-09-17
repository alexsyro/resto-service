const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Subcategory }) {
      // define association here
      // Одна категория может включать в себя несколько подкатегорий
      Category.hasMany(Subcategory);
    }
  }
  Category.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
