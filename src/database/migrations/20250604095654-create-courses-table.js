'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      course_package_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'course_packages',
          key: 'id',
        },
      },
      music_genre_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id',
        },
      },
      branch_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'branches',
          key: 'id',
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      description: {
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
    await queryInterface.dropTable('courses');
  },
};
