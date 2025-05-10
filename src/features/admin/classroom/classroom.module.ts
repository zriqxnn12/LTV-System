import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Classroom } from '../../../models/classrooms/entities/classroom.entity';

@Module({
  imports: [SequelizeModule.forFeature([Classroom])],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
