import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from 'src/models/staff/entities/teacher.entity';

@Module({
  imports: [SequelizeModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
