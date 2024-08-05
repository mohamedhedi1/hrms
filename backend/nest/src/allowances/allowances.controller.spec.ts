import { Test, TestingModule } from '@nestjs/testing';
import { AllowancesController } from './allowances.controller';
import { AllowancesService } from './allowances.service';

describe('AllowancesController', () => {
  let controller: AllowancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowancesController],
      providers: [AllowancesService],
    }).compile();

    controller = module.get<AllowancesController>(AllowancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
