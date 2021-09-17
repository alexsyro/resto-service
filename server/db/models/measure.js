const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Position }) {
      // define association here
      // Одна мера измерения может быть в нескольких блюдах
      Measure.hasMany(Position);
    }
  }
  Measure.init(
    {
      type: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Measure',
    },
  );
  return Measure;
};
