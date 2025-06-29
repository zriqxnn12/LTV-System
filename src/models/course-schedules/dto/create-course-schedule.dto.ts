import CourseScheduleStatusEnum from '../enums/course-schedule-status.enum';

export class CreateCourseScheduleDto {
  course_id: number;
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
}
