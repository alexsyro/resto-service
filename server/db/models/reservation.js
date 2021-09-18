const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Table, Order }) {
      // define association here
      // Зарезервирован может быть лишь один столик
      Reservation.belongsTo(Table);
      // И на один зарезервированный столик может быть несколько заказов (каждому клиенту свой счёт)
      Reservation.hasMany(Order);
    }
  }
  Reservation.init(
    {
      table_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: 'Tables',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      dateTime: {
        allowNull: false,
        field: 'date_time',
        type: DataTypes.DATE,
      },
      guestCount: {
        field: 'guest_count',
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      timeInterval: {
        field: 'time_interval',
        type: DataTypes.INTEGER,
        defaultValue: 90,
      },
    },
    {
      sequelize,
      modelName: 'Reservation',
    },
  );
  return Reservation;
};
