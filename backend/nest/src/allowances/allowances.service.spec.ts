import { Test, TestingModule } from '@nestjs/testing';
import { AllowancesService } from './allowances.service';

describe('AllowancesService', () => {
  let service: AllowancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowancesService],
    }).compile();

    service = module.get<AllowancesService>(AllowancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
