const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Position }) {
      // define association here
      // У подкатегории может быть только одна родительская категория
      Subcategory.belongsTo(Category);
      // В одной подкатегории может быть много блюд
      Subcategory.hasMany(Position);
    }
  }
  Subcategory.init(
    {
      CategoryId: {
        allowNull: false,
        field: 'category_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Category',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Subcategory',
    },
  );
  return Subcategory;
};
