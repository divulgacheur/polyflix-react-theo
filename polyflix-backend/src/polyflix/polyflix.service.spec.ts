import { Test, TestingModule } from '@nestjs/testing';
import { PolyflixService } from './polyflix.service';

describe('PolyflixService', () => {
  let service: PolyflixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolyflixService],
    }).compile();

    service = module.get<PolyflixService>(PolyflixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
