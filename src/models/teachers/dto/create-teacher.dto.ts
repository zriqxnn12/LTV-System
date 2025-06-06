import StaffRoleEnum from 'src/models/staff/enums/staff-role.enum';
import StaffStatusEnum from 'src/models/staff/enums/staff-status.enum';
import TeacherType from 'src/models/staff/enums/teacher-type.enum';

export class CreateTeacherDto {
  classroom_id: number;
  branch_id: number;
  type_name?: string;
  type: TeacherType;
  description: string;
  qualify: string;
  staff?: {
    role_name?: string;
    status_name?: string;
    role: StaffRoleEnum;
    status: StaffStatusEnum;
    note: string;
    user?: {
      phone_no: string;
      address: string;
      birth_place: string;
      birth_date: string;
    };
  };
}
