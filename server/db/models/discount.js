const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client }) {
      // define association here
      // Одна скидка может быть у многих людей
      Discount.hasMany(Client);
    }
  }
  Discount.init(
    {
      size: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      minLimit: {
        field: 'min_limit',
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      maxLimit: {
        field: 'max_limit',
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      isPersonal: {
        field: 'is_personal',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Discount',
    },
  );
  return Discount;
};
