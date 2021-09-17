const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, Reservation, PositionOrder }) {
      // define association here
      // Счёт может быть открыт только на одного клиента
      Order.belongsTo(Client);
      // Один заказ принадлежит только одному зарезервированному столику
      Order.belongsTo(Reservation);
      // В одном заказе может быть много блюд (В данном случае это сводная таблица,
      // которая хранит список id заказа - id блюда - количество)
      Order.hasMany(PositionOrder);
    }
  }
  Order.init(
    {
      ClientId: {
        allowNull: false,
        field: 'client_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Clients',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      ReservationId: {
        allowNull: false,
        field: 'reservation_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Reservations',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
