export class CreateStudentDto {
  gender: string;
  religion: string;
  school: string;
  province: string;
  city: string;
  whatsapp_number: string;
  note: string;
  user?: {
    name: string;
    username: string;
    email: string;
    address: string;
    birth_place: string;
  };
}
