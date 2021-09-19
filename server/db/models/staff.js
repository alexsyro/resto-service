const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, File }) {
      // define association here
      // Один человек может занимать только одну должность.
      Staff.belongsTo(Post);
      // Человек соответствует только одной фотке
      Staff.belongsTo(File);
    }
  }
  Staff.init(
    {
      PostId: {
        allowNull: false,
        field: 'post_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Posts',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      login: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      phone: {
        allowNull: true,
        type: DataTypes.TEXT,
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
      modelName: 'Staff',
    },
  );
  return Staff;
};
