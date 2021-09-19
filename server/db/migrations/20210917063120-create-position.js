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
      MeasureId: {
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
        type: Sequelize.FLOAT,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      FileId: {
        field: 'file_id',
        allowNull: true,
        type: Sequelize.INTEGER,
        reference: {
          model: 'Files',
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
    await queryInterface.dropTable('Positions');
  },
};
