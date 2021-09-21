const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Reservation }) {
      // define association here
      State.hasMany(Order);
      State.hasMany(Reservation);
    }
  }
  State.init(
    {
      state: {
        allowNull: false,
        type: DataTypes.ENUM('ВЫПОЛНЕН', 'ПРЕДЗАКАЗ', 'ПОДТВЕРЖДЁН', 'НЕПОДТВЕРЖДЁН', 'ОТМЕНЁН', 'ДОСТАВКА', 'ОПЛАЧЕН'),
      },
    },
    {
      sequelize,
      modelName: 'State',
    },
  );
  return State;
};
