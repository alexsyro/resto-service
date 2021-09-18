module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      HallId: {
        allowNull: false,
        field: 'hall_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Halls',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seatsLimit: {
        allowNull: false,
        field: 'seats_limit',
        type: Sequelize.INTEGER,
      },
      svgCoords: {
        allowNull: true,
        field: 'svg_coords',
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
    await queryInterface.dropTable('Tables');
  },
};
