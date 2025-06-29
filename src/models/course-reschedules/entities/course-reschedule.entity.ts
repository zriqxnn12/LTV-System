import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'course_reschedules',
  modelName: 'course_reschedules',
})
export class CourseReschedule extends Model {
  @ForeignKey(() => CourseSchedule)
  @Column(DataType.BIGINT)
  course_schedule_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  date_start: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  date_end: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  start_time: string;

  @Column({ type: DataType.TIME, allowNull: false })
  end_time: string;

  @Column({ type: DataType.STRING, allowNull: false })
  note: string;

  @BelongsTo(() => CourseSchedule)
  course_schedule: CourseSchedule;
}
