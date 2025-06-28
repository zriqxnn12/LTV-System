import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Attendance } from 'src/models/attendances/entities/attendance.entity';
import { CourseReschedule } from 'src/models/course-reschedules/entities/course-reschedule.entity';
import { Course } from 'src/models/courses/entities/course.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { getCourseScheduleStatusEnumLabel } from '../enums/course-schedule-status.enum';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'course_schedules',
  modelName: 'course_schedules',
})
export class CourseSchedule extends Model {
  @ForeignKey(() => Course)
  @Column(DataType.BIGINT)
  course_id: number;

  @ForeignKey(() => Teacher)
  @Column(DataType.BIGINT)
  teacher_id: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: CourseReschedule) {
      return getCourseScheduleStatusEnumLabel(this.getDataValue('status'));
    },
  })
  status_name: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  status: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  date_start: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  date_end: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  day: number;

  @Column({ type: DataType.TIME, allowNull: false })
  start_time: string;

  @Column({ type: DataType.TIME, allowNull: false })
  end_time: string;

  @HasOne(() => Attendance)
  attendance: Attendance;

  @HasOne(() => CourseReschedule)
  course_reschedule: CourseReschedule;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Teacher)
  teacher: Teacher;
}
