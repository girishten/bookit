import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRole } from '../entities/role.entity';
import { UserRoleDto } from '../dto/user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createRole(userRoleDto: UserRoleDto) {
    userRoleDto.createdBy = 'ROLE_CONTROLLER';
    userRoleDto.updatedBy = userRoleDto.createdBy;

    return await this.userRoleRepository.save(userRoleDto);
  }

  findAllUserRoles(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  async findARoleByName(name: string): Promise<UserRole | null> {
    return await this.userRoleRepository.findOneBy({ name });
  }

  async findRolesByName(roles: string[]): Promise<UserRole[]> {
    // Find Roles
    const existingAppUserRoles = await this.findAllUserRoles();
    let requestedRoles = roles || [];
    requestedRoles = [...new Set(requestedRoles)];
    const identifiedRoles = existingAppUserRoles.filter((userRole) => {
      requestedRoles.includes(userRole.name);
    });
    if (identifiedRoles.length > requestedRoles.length) {
      throw new BadRequestException('User roles not found');
    } else {
      return identifiedRoles;
    }
  }

  async enableRole(name: string) {
    const userRole = await this.findARoleByName(name);
    if (!userRole) {
      throw new NotFoundException(`User role ${name} is Not Found!`);
    } else {
      userRole.isActive = true;
      userRole.updatedBy = 'ROLE_CONTROLLER';
      return await this.userRoleRepository.save(userRole);
    }
  }

  async disableRole(name: string) {
    const userRole = await this.findARoleByName(name);
    if (!userRole) {
      throw new NotFoundException(`User role ${name} is Not Found!`);
    } else {
      userRole.isActive = false;
      userRole.updatedBy = 'ROLE_CONTROLLER';
      return await this.userRoleRepository.save(userRole);
    }
  }

  async removeRole(name: string): Promise<void> {
    const userRole = await this.findARoleByName(name);
    if (!userRole) {
      throw new NotFoundException(`User role ${name} is Not Found!`);
    } else {
      await this.dataSource.query(
        `DELETE FROM bookit_backend.user_roles_user_role WHERE 'userRoleName' = '${name}'`,
      );
      await this.userRoleRepository.delete(name);
    }
  }
}
