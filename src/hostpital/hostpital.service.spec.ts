import { Test, TestingModule } from '@nestjs/testing';
import { HostpitalService } from './hostpital.service';

describe('HostpitalService', () => {
  let service: HostpitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostpitalService],
    }).compile();

    service = module.get<HostpitalService>(HostpitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
