'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_participants', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      event_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
      },
      status_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(16, 2),
        allowNull: false,
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      file_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('event_participants');
  },
};
