import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ClientCreditCard, CreditCard } from '@prisma/client';
import { SaveCreditCardDTO } from './dto/save-credit-card.dto';

describe('CreditCardController', () => {
  let controller: PaymentController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService, PrismaService, ConfigService]
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de CRUD de cartão de crédito com sucesso', () => {
    const CLIENT_ID: string = '1';

    const MOCK_CREDIT_CARD: CreditCard = {
      id: '1',
      number: '1234567890123456',
      cvv: '123',
      flag: 'VISA',
      expireMonth: 12,
      expireYear: 2030,
      full_name: 'Fulano de Tal',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }
    const MOCK_CLIENT_CREDIT_CARD: ClientCreditCard = {
      id: '1',
      clientId: CLIENT_ID,
      creditCardId: MOCK_CREDIT_CARD.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }

    it('deve retornar todos os cartões de crédito do cliente', async () => {
      // Setup
      db.clientCreditCard.findMany = jest.fn().mockResolvedValue([MOCK_CLIENT_CREDIT_CARD]);
      db.creditCard.findMany = jest.fn().mockResolvedValue([MOCK_CREDIT_CARD]);

      // Teste
      const result = await controller.getAllCreditCards(CLIENT_ID);
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(MOCK_CREDIT_CARD.id);
    })

    it('deve salvar um novo cartão de crédito para o cliente', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockResolvedValue({ id: CLIENT_ID });
      db.creditCard.create = jest.fn().mockResolvedValue(MOCK_CREDIT_CARD);
      db.clientCreditCard.create = jest.fn().mockResolvedValue(MOCK_CLIENT_CREDIT_CARD);

      // Teste
      const input: SaveCreditCardDTO = {
        number: MOCK_CREDIT_CARD.number,
        cvv: MOCK_CREDIT_CARD.cvv,
        flag: MOCK_CREDIT_CARD.flag,
        expireMonth: MOCK_CREDIT_CARD.expireMonth.toString(),
        expireYear: MOCK_CREDIT_CARD.expireYear.toString(),
        full_name: MOCK_CREDIT_CARD.full_name,
      }

      const result = await controller.saveNewCreditCard(CLIENT_ID, input);
      expect(result).toBeDefined();
      expect(result.id).toBe(MOCK_CREDIT_CARD.id);
    })

    it('deve deletar um cartão de crédito do cliente', async () => {
      // Setup
      db.clientCreditCard.findUnique = jest.fn().mockResolvedValue(MOCK_CLIENT_CREDIT_CARD);
      db.clientCreditCard.update = jest.fn().mockResolvedValue(MOCK_CLIENT_CREDIT_CARD);

      // Teste
      const result = await controller.deleteCreditCard(CLIENT_ID, MOCK_CLIENT_CREDIT_CARD.id);
      expect(result).toBeNull();
      expect(db.clientCreditCard.update).toHaveBeenCalledTimes(1)
    })

  })
});
