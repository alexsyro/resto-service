const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Discount, Order }) {
      // define association here
      // У одного клиента может быть много заказов
      Client.hasMany(Order);
      // У клиента одновременно может быть только одна скидка
      Client.belongsTo(Discount);
    }
  }
  Client.init(
    {
      DiscountId: {
        allowNull: false,
        field: 'discount_id',
        type: DataTypes.INTEGER,
        reference: {
          model: 'Discounts',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
      phone: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Client',
    },
  );
  return Client;
};
