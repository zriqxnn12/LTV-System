import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';
import { getStaffRoleEnumLabel } from '../enums/staff-role.enum';
import { getStaffStatusEnumLabel } from '../enums/staff-status.enum';
import { Teacher } from 'src/models/staff/entities/teacher.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'staff',
  modelName: 'staff',
})
export class Staff extends Model {
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  user_id: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Staff) {
      return getStaffRoleEnumLabel(this.getDataValue('role'));
    },
  })
  role_name: string;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Staff) {
      return getStaffStatusEnumLabel(this.getDataValue('status'));
    },
  })
  status_name: string;

  @Column(DataType.TINYINT)
  role: number;

  @Column(DataType.TINYINT)
  status: number;

  @Column(DataType.STRING)
  note: string;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Teacher)
  teacher: Teacher;
}
