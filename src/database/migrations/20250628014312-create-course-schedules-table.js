'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course_schedules', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      course_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      teacher_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'teachers',
          key: 'id',
        },
      },
      classroom_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'classrooms',
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
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
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
    await queryInterface.dropTable('course_schedules');
  },
};
