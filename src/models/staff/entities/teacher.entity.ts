import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Branch } from 'src/models/branches/entities/branch.entity';
import { Classroom } from 'src/models/classrooms/entities/classroom.entity';
import { Staff } from 'src/models/staff/entities/staff.entity';
import { getTeacherTypeEnumLabel } from '../enums/teacher-type.enum';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'teachers',
  modelName: 'teachers',
})
export class Teacher extends Model {
  @ForeignKey(() => Staff)
  @Column(DataType.NUMBER)
  staff_id: number;

  @ForeignKey(() => Classroom)
  @Column(DataType.NUMBER)
  classroom_id: number;

  @ForeignKey(() => Branch)
  @Column(DataType.NUMBER)
  branch_id: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Teacher) {
      return getTeacherTypeEnumLabel(this.getDataValue('type'));
    },
  })
  type_name: string;

  @Column(DataType.TINYINT)
  type: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  qualify: string;

  @BelongsTo(() => Staff)
  staff: Staff;

  @BelongsTo(() => Classroom)
  classroom: Classroom;

  @BelongsTo(() => Branch)
  branch: Branch;
}
