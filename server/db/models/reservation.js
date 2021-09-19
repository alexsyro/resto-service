const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Table, State, Order }) {
      // define association here
      // Зарезервирован может быть лишь один столик
      Reservation.belongsTo(Table);
      // И на один зарезервированный столик может быть несколько заказов (каждому клиенту свой счёт)
      Reservation.belongsTo(State);
      // На одно резервирование может приходиться только один заказ
      Reservation.hasOne(Order);
    }
  }
  Reservation.init(
    {
      TableId: {
        field: 'table_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        reference: {
          model: 'Tables',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      StateId: {
        allowNull: false,
        field: 'state_id',
        type: DataTypes.INTEGER,
        defaultValue: 1,
        reference: {
          model: 'States',
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
      guestName: {
        field: 'guest_name',
        type: DataTypes.TEXT,
      },
      guestPhone: {
        field: 'guest_phone',
        type: DataTypes.TEXT,
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
