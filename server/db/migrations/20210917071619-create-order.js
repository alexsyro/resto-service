module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ClientId: {
        allowNull: false,
        field: 'client_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Clients',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      StateId: {
        allowNull: false,
        field: 'state_id',
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        reference: {
          model: 'States',
          key: 'id',
          onUpdate: 'CASCADE',
        },
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
    await queryInterface.dropTable('Orders');
  },
};
