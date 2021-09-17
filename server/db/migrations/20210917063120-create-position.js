module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Positions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SubcategoryId: {
        allowNull: false,
        field: 'subcategory_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Subcategories',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      measure_id: {
        allowNull: false,
        field: 'measure_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Measures',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      kcal: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      portionSize: {
        field: 'portion_size',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      img_path: {
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
    await queryInterface.dropTable('Positions');
  },
};
