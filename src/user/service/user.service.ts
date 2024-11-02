import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRoleService } from './user-role.service';

import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userRoleService: UserRoleService,
  ) {}

  async createUser(createUserDto: UserDto) {
    // Find Roles
    const identifiedRoles = await this.userRoleService.findRolesByName(
      createUserDto.role,
    );
    createUserDto.role = undefined;
    createUserDto.roles = identifiedRoles;

    // hash password
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    // const isMatch = await bcrypt.compare(password, hash);

    // Update Audit info
    createUserDto.createdBy = 'USER_CONTROLLER';
    createUserDto.updatedBy = createUserDto.createdBy;

    return await this.usersRepository.save(createUserDto);
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => {
      user.password = undefined;
      return user;
    });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    user.password = undefined;
    return user;
  }

  async findUserDetailsById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: { roles: true },
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    user.password = undefined;
    return user;
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto | User) {
    updateUserDto.password = undefined;
    updateUserDto.roles = undefined;
    const user = await this.findUserById(id);
    const userData = { ...user, ...updateUserDto };
    userData.updatedBy = 'USER_CONTROLLER';
    return await this.usersRepository.save(userData);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addRolesToUser(id: string, roles: string[]) {
    const newlyReqUserRoles = await this.userRoleService.findRolesByName(roles);
    const user = await this.findUserDetailsById(id);
    let existingUserRoles: any[] = user.roles ? user.roles : [];
    existingUserRoles = existingUserRoles.map((role) => role.name);
    const rolesToBeAdded = newlyReqUserRoles.filter(
      (newRole) => !existingUserRoles.includes(newRole.name),
    );
    user.roles.push(...rolesToBeAdded);
    user.updatedBy = 'USER_CONTROLLER';
    await this.usersRepository.save(user);
  }

  async removeRoleFromUser(id: string, rolesToRemove: string[]) {
    const user = await this.findUserDetailsById(id);
    const existingUserRoles: UserRole[] = user.roles ? user.roles : [];
    user.roles = existingUserRoles.filter(
      (userRole) => !rolesToRemove.includes(userRole.name),
    );
    user.updatedBy = 'USER_CONTROLLER';
    await this.usersRepository.save(user);
  }
}
