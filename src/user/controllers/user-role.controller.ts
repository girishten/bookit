import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserRoleService } from '../service/user-role.service';
import { UpdateUserRoleDto, UserRoleDto } from '../dto/user-role.dto';

@Controller('user/roles')
export class UserRoleController {
  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
  ) {}

  @Post()
  async createUserRole(@Body() userRoleDto: UserRoleDto) {
    await this.userRoleService.createRole(userRoleDto);
  }

  @Get()
  async findAll() {
    return await this.userRoleService.findAllUserRoles();
  }

  @Delete(':name')
  async removeUserRole(@Param('name') name: string) {
    return await this.userRoleService.removeRole(name);
  }

  @Post(':name/status')
  async changeRoleStatus(
    @Param('name') name: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    if (updateUserRoleDto.isActive) {
      await this.userRoleService.enableRole(name);
    } else {
      await this.userRoleService.disableRole(name);
    }
  }
}
