const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Subcategory, Measure, OrderPosition, File }) {
      // define association here
      // блюдо может принадлежать только одной категории одновременно
      Position.belongsTo(Subcategory);
      // У блюда может быть только одна единица измерения
      Position.belongsTo(Measure);
      // Одно блюдо может находиться в нескольких заказах
      Position.hasMany(OrderPosition);
      // У позиции может быть только одно фото
      Position.belongsTo(File);
    }
  }
  Position.init(
    {
      SubcategoryId: {
        allowNull: false,
        field: 'subcategory_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Subcategories',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      MeasureId: {
        allowNull: false,
        field: 'measure_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Measures',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      kcal: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      portionSize: {
        field: 'portion_size',
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      FileId: {
        field: 'file_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        reference: {
          model: 'Files',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
    },
    {
      sequelize,
      modelName: 'Position',
    },
  );
  return Position;
};
