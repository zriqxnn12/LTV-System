export class CreateStudentDto {
  gender: string;
  religion: string;
  school: string;
  province: string;
  city: string;
  whatsapp_number: string;
  note: string;
  user?: {
    phone_no: string;
    address: string;
    birth_place: string;
    birth_date: string;
  };
}
