import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Branch } from 'src/models/branches/entities/branch.entity';
import { CoursePackage } from 'src/models/course-packages/entities/course-package.entity';
import { Instrument } from 'src/models/instruments/entities/instrument.entity';
import { Genre } from 'src/models/music-genres/entities/music-genre.entity';
import { Student } from 'src/models/students/entities/student.entity';

@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  tableName: 'courses',
  modelName: 'courses',
})
export class Course extends Model {
  @ForeignKey(() => Student)
  @Column(DataType.BIGINT)
  student_id: number;

  @ForeignKey(() => CoursePackage)
  @Column(DataType.BIGINT)
  course_package_id: number;

  @ForeignKey(() => Instrument)
  @Column(DataType.BIGINT)
  instrument_id: number;

  @ForeignKey(() => Genre)
  @Column(DataType.BIGINT)
  music_genre_id: number;

  @ForeignKey(() => Branch)
  @Column(DataType.BIGINT)
  branch_id: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_active: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => CoursePackage)
  course_package: CoursePackage;

  @BelongsTo(() => Instrument)
  instrument: Instrument;

  @BelongsTo(() => Genre)
  music_genre: Genre;

  @BelongsTo(() => Branch)
  branch: Branch;
}
