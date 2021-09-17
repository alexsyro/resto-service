module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      minLimit: {
        field: 'min_limit',
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      maxLimit: {
        field: 'max_limit',
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      isPersonal: {
        field: 'is_personal',
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      name: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: true,
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
    await queryInterface.dropTable('Discounts');
  },
};
