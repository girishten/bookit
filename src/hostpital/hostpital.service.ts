import { Injectable } from '@nestjs/common';
import { CreateHostpitalDto } from './dto/create-hostpital.dto';
import { UpdateHostpitalDto } from './dto/update-hostpital.dto';

@Injectable()
export class HostpitalService {
  create(createHostpitalDto: CreateHostpitalDto) {
    return 'This action adds a new hostpital';
  }

  findAll() {
    return `This action returns all hostpital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hostpital`;
  }

  update(id: number, updateHostpitalDto: UpdateHostpitalDto) {
    return `This action updates a #${id} hostpital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hostpital`;
  }
}
