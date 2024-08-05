import { Test, TestingModule } from '@nestjs/testing';
import { CvassistantController } from './cvassistant.controller';

describe('CvassistantController', () => {
  let controller: CvassistantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvassistantController],
    }).compile();

    controller = module.get<CvassistantController>(CvassistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
