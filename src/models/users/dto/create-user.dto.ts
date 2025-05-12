export class CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  phone_no: string;
  address: string;
  birth_place: string;
  birth_date: string;
  profile_file_path: string;
  staff?: {
    role_name: string;
    status_name: string;
    role: number;
    status: number;
    note: string;
  };
}
