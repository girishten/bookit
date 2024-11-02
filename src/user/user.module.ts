import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRoleController } from './controllers/user-role.controller';
import { UserRole } from './entities/role.entity';
import { UserRoleService } from './service/user-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  controllers: [UserController, UserRoleController],
  providers: [UserService, UserRoleService],
})
export class UserModule {}
