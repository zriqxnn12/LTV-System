import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { getAttendanceStatusEnumLabel } from '../enums/attendance-status.enum';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'attendances',
  modelName: 'attendances',
})
export class Attendance extends Model {
  @ForeignKey(() => CourseSchedule)
  @Column(DataType.BIGINT)
  course_schedule_id: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Attendance) {
      return getAttendanceStatusEnumLabel(this.getDataValue('status'));
    },
  })
  status_name: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  status: number;

  @Column({ type: DataType.STRING, allowNull: true })
  file_path: string;

  @Column({ type: DataType.STRING, allowNull: true })
  note: string;

  @BelongsTo(() => CourseSchedule)
  course_schedule: CourseSchedule;
}
