module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order_positions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      OrderId: {
        allowNull: false,
        field: 'order_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Orders',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      PositionId: {
        allowNull: false,
        field: 'position_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Positions',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    await queryInterface.dropTable('Order_positions');
  },
};
