import { Test, TestingModule } from '@nestjs/testing';
import { HostpitalController } from './hostpital.controller';
import { HostpitalService } from './hostpital.service';

describe('HostpitalController', () => {
  let controller: HostpitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostpitalController],
      providers: [HostpitalService],
    }).compile();

    controller = module.get<HostpitalController>(HostpitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
