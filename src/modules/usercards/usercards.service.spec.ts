import { Test, TestingModule } from '@nestjs/testing';
import { UsercardsService } from './usercards.service';

describe('UsercardsService', () => {
  let service: UsercardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsercardsService],
    }).compile();

    service = module.get<UsercardsService>(UsercardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
