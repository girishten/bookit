import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HostpitalService } from './hostpital.service';
import { CreateHostpitalDto } from './dto/create-hostpital.dto';
import { UpdateHostpitalDto } from './dto/update-hostpital.dto';

@Controller('hostpital')
export class HostpitalController {
  constructor(private readonly hostpitalService: HostpitalService) {}

  @Post()
  create(@Body() createHostpitalDto: CreateHostpitalDto) {
    return this.hostpitalService.create(createHostpitalDto);
  }

  @Get()
  findAll() {
    return this.hostpitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostpitalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostpitalDto: UpdateHostpitalDto) {
    return this.hostpitalService.update(+id, updateHostpitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostpitalService.remove(+id);
  }
}
