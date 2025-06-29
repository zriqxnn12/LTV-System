import CourseScheduleStatusEnum from 'src/models/course-schedules/enums/course-schedule-status.enum';

export class CreateCourseDto {
  student_id: number;
  instrument_id: number;
  course_package_id: number;
  music_genre_id: number;
  branch_id: number;
  is_active: boolean;
  description: string;
  course_schedule: {
    teacher_id: number;
    classroom_id: number;
    status_name?: string;
    status: CourseScheduleStatusEnum;
    duration: number;
    date: string;
    date_start: string;
    date_end: string;
    day: number;
    start_time: string;
    end_time: string;
  }[];
}
