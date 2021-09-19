const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Position, Staff }) {
      // define association here
      File.hasMany(Position);
      File.hasOne(Staff);
    }
  }
  File.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      size: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      data: {
        allowNull: false,
        type: DataTypes.BLOB('long'),
      },
    },
    {
      sequelize,
      modelName: 'File',
    },
  );
  return File;
};
