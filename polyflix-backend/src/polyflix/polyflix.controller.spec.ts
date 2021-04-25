import { Test, TestingModule } from '@nestjs/testing';
import { PolyflixController } from './polyflix.controller';

describe('Blog Controller', () => {
  let controller: PolyflixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolyflixController],
    }).compile();

    controller = module.get<PolyflixController>(PolyflixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
