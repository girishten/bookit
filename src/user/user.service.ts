import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.role = ['Patient'];
    createUserDto.createdBy = 'USER_MODULE';
    createUserDto.createdAt = new Date();
    createUserDto.updatedBy = createUserDto.createdBy;
    createUserDto.updatedAt = createUserDto.createdAt;

    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedBy = 'USER_MODULE';
    updateUserDto.updatedAt = new Date();
    return this.usersRepository.save(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
