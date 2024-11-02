import { PartialType } from '@nestjs/swagger';

export class UserRoleDto {
  name: string;
  description: string;
  isActive?: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export class UpdateUserRoleDto extends PartialType(UserRoleDto) {}
