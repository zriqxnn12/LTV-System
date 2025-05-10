import {
  Column,
  DataType,
  DefaultScope,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'users',
  modelName: 'users',
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
export class User extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  phone_no: string;

  @Column(DataType.STRING)
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  birth_place: string;

  @Column({ type: DataType.STRING, allowNull: true })
  birth_date: string;

  @Column({ type: DataType.STRING, allowNull: true })
  profile_file_path: string;
}
