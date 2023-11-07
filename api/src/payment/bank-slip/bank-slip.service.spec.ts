import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipService } from './bank-slip.service';

describe('BankSlipService', () => {
  let service: BankSlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSlipService],
    }).compile();

    service = module.get<BankSlipService>(BankSlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
