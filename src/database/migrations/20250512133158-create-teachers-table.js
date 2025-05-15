'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      staff_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'staff',
          key: 'id',
        },
      },
      classroom_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'classrooms',
          key: 'id',
        },
      },
      branch_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'branches',
          key: 'id',
        },
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualify: {
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
    await queryInterface.dropTable('teachers');
  },
};
