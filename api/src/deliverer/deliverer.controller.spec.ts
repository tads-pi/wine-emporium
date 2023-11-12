import { Test, TestingModule } from '@nestjs/testing';
import { DelivererController } from './deliverer.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { DelivererService } from './deliverer.service';

describe('DelivererController', () => {
  let controller: DelivererController;
  let db: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelivererController],
      providers: [DelivererService, PrismaService, ConfigService]
    }).compile();

    controller = module.get<DelivererController>(DelivererController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar as operações de entregador com sucesso', () => {
    it('deve listar os entregadores', async () => {
      const result = await controller.listDeliverers()
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(0)
    })
  })
});
