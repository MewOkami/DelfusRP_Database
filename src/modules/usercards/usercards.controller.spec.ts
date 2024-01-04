import { Test, TestingModule } from '@nestjs/testing';
import { UsercardsController } from './usercards.controller';
import { UsercardsService } from './usercards.service';

describe('UsercardsController', () => {
  let controller: UsercardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercardsController],
      providers: [UsercardsService],
    }).compile();

    controller = module.get<UsercardsController>(UsercardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
