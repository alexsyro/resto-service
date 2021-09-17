const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderPosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Position }) {
      // define association here
      // В списке блюд заказа одна запись соответствует только одному заказу
      OrderPosition.belongsTo(Order);
      // В списке блюд заказа в одной записи может быть 
      // только одна позиция любое количество раз (поле quantity)
      OrderPosition.belongsTo(Position);
    }
  }
  OrderPosition.init(
    {
      OrderId: {
        allowNull: false,
        field: 'order_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Orders',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      PositionId: {
        allowNull: false,
        field: 'position_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Positions',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      tableName: 'Order_positions',
      modelName: 'OrderPosition',
    },
  );
  return OrderPosition;
};
