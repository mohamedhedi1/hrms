import { Test, TestingModule } from '@nestjs/testing';
import { CvassistantService } from './cvassistant.service';

describe('CvassistantService', () => {
  let service: CvassistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvassistantService],
    }).compile();

    service = module.get<CvassistantService>(CvassistantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
