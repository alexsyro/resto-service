const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, OrderPosition, State, Reservation }) {
      // define association here
      // Счёт может быть открыт только на одного клиента
      Order.belongsTo(Client);
      // У заказа может быть только один статус
      Order.belongsTo(State);
      // У заказа может быть только одно резервирование стола
      Order.belongsTo(Reservation);
      // В одном заказе может быть много блюд (В данном случае это сводная таблица,
      // которая хранит список id заказа - id блюда - количество)
      Order.hasMany(OrderPosition);
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
      ReservationId: {
        allowNull: true,
        field: 'reservation_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'States',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
