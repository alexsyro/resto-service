module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PostId: {
        allowNull: false,
        field: 'post_id',
        type: Sequelize.INTEGER,
        reference: {
          model: 'Posts',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      login: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phone: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Staffs');
  },
};
