import { PartialType } from '@nestjs/swagger';
import { UserRole } from '../entities/role.entity';

export class UserDto {
  namePrefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;

  password?: string;
  role?: string[];
  roles?: UserRole[];
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class UserRolesDto {
  roles: string[];
}
