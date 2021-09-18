const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Hall, Reservation }) {
      // define association here
      // Стол может быть только в одном зале
      Table.belongsTo(Hall);
      // Один стол может быть зарезервирован несколько раз
      Table.hasMany(Reservation);
    }
  }
  Table.init(
    {
      HallId: {
        allowNull: false,
        field: 'hall_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Halls',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      number: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      seatsLimit: {
        allowNull: false,
        field: 'seats_limit',
        type: DataTypes.INTEGER,
      },
      svgCoords: {
        allowNull: true,
        field: 'svg_coords',
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Table',
    },
  );
  return Table;
};
