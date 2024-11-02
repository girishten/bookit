import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdateUserDto, UserDto, UserRolesDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }

  @Get(':id/role')
  async findUserRoles(@Param('id') id: string) {
    const user = await this.userService.findUserDetailsById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.roles.map((userRole) => userRole.name);
  }

  @Post(':id/role')
  async addRolesToUser(@Param('id') id: string, @Body() payload: UserRolesDto) {
    if (!payload || !payload.roles) {
      throw new BadRequestException('Roles missing from payload!');
    }
    await this.userService.addRolesToUser(id, payload.roles);
  }

  @Delete(':id/role')
  async removeRoleFromUser(@Param('id') id: string, @Body() payload: UserRolesDto) {
    if (!payload || !payload.roles) {
      throw new BadRequestException('Roles missing from payload');
    }

    await this.userService.removeRoleFromUser(id, payload.roles);
  }
}
