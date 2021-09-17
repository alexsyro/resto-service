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
      ReservationId: {
        allowNull: false,
        field: 'reservation_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Reservations',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      status: {
        allowNull: false,
        type: Sequelize.TEXT,
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
