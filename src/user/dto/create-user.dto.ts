import { UserRole } from '../models/constants';

export class CreateUserDto {
  namePrefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  role?: UserRole[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
