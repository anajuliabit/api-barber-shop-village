import { Test, TestingModule } from '@nestjs/testing';
import { BarberController } from './barber.controller';

describe('BarberController', () => {
  let controller: BarberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberController],
    }).compile();

    controller = module.get<BarberController>(BarberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
