module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TableId: {
        field: 'table_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'Tables',
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
      dateTime: {
        allowNull: false,
        field: 'date_time',
        type: Sequelize.DATE,
      },
      guestCount: {
        field: 'guest_count',
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      guestName: {
        field: 'guest_name',
        type: Sequelize.TEXT,
      },
      guestPhone: {
        field: 'guest_phone',
        type: Sequelize.TEXT,
      },
      timeInterval: {
        field: 'time_interval',
        type: Sequelize.INTEGER,
        defaultValue: 90,
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
    await queryInterface.dropTable('Reservations');
  },
};
