import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipController } from './bank-slip.controller';

describe('BankSlipController', () => {
  let controller: BankSlipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankSlipController],
    }).compile();

    controller = module.get<BankSlipController>(BankSlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it.todo('')
});
