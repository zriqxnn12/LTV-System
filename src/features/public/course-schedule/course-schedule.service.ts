import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryBuilderHelper } from 'src/cores/helpers/query-builder.helper';
import { ResponseHelper } from 'src/cores/helpers/response.helper';
import { UpdateCourseScheduleDto } from 'src/models/course-schedules/dto/update-course-schedule.dto';
import { CourseSchedule } from 'src/models/course-schedules/entities/course-schedule.entity';
import { Teacher } from 'src/models/staff/entities/teacher.entity';
import { Student } from 'src/models/students/entities/student.entity';

@Injectable()
export class CourseSchedulePublicService {
  constructor(
    private readonly response: ResponseHelper,
    private sequelize: Sequelize,
    @InjectModel(CourseSchedule)
    private courseScheduleModel: typeof CourseSchedule,
    @InjectModel(Student)
    private studentModel: typeof Student,
    @InjectModel(Teacher)
    private teacherModel: typeof Teacher,
  ) {}

  async findAll(query: any, user: any) {
    const { start_date, end_date } = query;
    const whereClause: any = {};

    // if (start_date && end_date) {
    //   const start = new Date(`${start_date}T00:00:00.000Z`);
    //   const end = new Date(`${end_date}T23:59:59.999Z`);
    //   whereClause.date_start = {
    //     [Op.between]: [start, end],
    //   };
    // }
    if (start_date && end_date) {
      const start = new Date(start_date);
      const end = new Date(end_date);
      end.setHours(23, 59, 59, 999);
      whereClause.date_start = {
        [Op.between]: [start, end],
      };
    }

    const baseIncludes = [
      {
        association: 'teacher',
        include: [
          {
            association: 'staff',
            include: [{ association: 'user' }],
          },
        ],
      },
      { association: 'attendance' },
      { association: 'course_reschedule' },
    ];

    // Deteksi user role (tanpa role column)
    const student = await this.studentModel.findOne({
      where: { user_id: user.id },
    });

    const teacher = await this.teacherModel.findOne({
      include: [
        {
          association: 'staff',
          required: true,
          include: [
            {
              association: 'user',
              required: true,
              where: { id: user.id },
            },
          ],
        },
      ],
    });

    const queryBuilder = new QueryBuilderHelper(
      this.courseScheduleModel,
      query,
    ).where(whereClause);

    // Jika student, tambahkan course.student.user untuk filter saja, tapi exclude dari result
    if (student) {
      queryBuilder.load(
        {
          association: 'course',
          required: true,
          include: [
            {
              association: 'student',
              required: true,
              include: [
                {
                  association: 'user',
                  required: true,
                  where: { id: user.id },
                },
              ],
            },
          ],
        },
        ...baseIncludes,
      );
    }

    // Jika teacher, load teacher.staff.user untuk filter, dan course.student.user untuk tampil
    else if (teacher) {
      queryBuilder.load(
        {
          association: 'teacher',
          required: true,
          include: [
            {
              association: 'staff',
              required: true,
              include: [
                {
                  association: 'user',
                  required: true,
                  where: { id: user.id },
                },
              ],
            },
          ],
        },
        {
          association: 'course',
          include: [
            {
              association: 'student',
              include: [
                {
                  association: 'user',
                },
              ],
            },
          ],
        },
        { association: 'attendance' },
        { association: 'course_reschedule' },
      );
    }

    const { count, data } = await queryBuilder.getResult();

    return this.response.success(
      {
        count,
        course_schedules: data,
      },
      200,
      'Successfully retrieve course schedules',
    );
  }

  async findOne(id: number) {
    try {
      const course = await this.courseScheduleModel.findOne({
        where: { id },
        include: [
          {
            association: 'course',
            include: [
              {
                association: 'student',
                include: [{ association: 'user' }],
              },
            ],
          },
          {
            association: 'teacher',
            include: [
              {
                association: 'staff',
                include: [{ association: 'user' }],
              },
            ],
          },
          { association: 'attendance' },
          { association: 'course_reschedule' },
        ],
      });
      return this.response.success(
        course,
        200,
        'Successfully retrieve course schedule',
      );
    } catch (error) {
      return this.response.fail('Failed retrieve course schedule', 400);
    }
  }

  update(id: number, updateCourseScheduleDto: UpdateCourseScheduleDto) {
    return `This action updates a #${id} courseSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSchedule`;
  }
}
