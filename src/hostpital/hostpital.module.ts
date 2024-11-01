import { Module } from '@nestjs/common';
import { HostpitalService } from './hostpital.service';
import { HostpitalController } from './hostpital.controller';

@Module({
  controllers: [HostpitalController],
  providers: [HostpitalService],
})
export class HostpitalModule {}
