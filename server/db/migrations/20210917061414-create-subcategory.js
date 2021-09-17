module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subcategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CategoryId: {
        allowNull: false,
        field: 'category_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Categories',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      name: {
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
    await queryInterface.dropTable('Subcategories');
  },
};
