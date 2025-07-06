export class CreateAttendanceDto {
  course_schedule_id: number;
  status_name?: string;
  status: number;
  file_path: string;
  note: string;
}
