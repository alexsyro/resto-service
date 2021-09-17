const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Table }) {
      // define association here
      // В одном зале может быть несколько столов
      Hall.hasMany(Table);
    }
  }
  Hall.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Hall',
    },
  );
  return Hall;
};
