module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'ВЫПОЛНЕНО',
          'ПРЕДЗАКАЗ',
          'ПОДТВЕРЖДЕНО',
          'НЕПОДТВЕРЖДЕНО',
          'ОТМЕНА',
          'ДОСТАВКА',
          'ОПЛАЧЕНО',
        ],
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('States');
  },
};
