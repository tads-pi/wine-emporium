import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../../aws/s3/s3.service';
import { Product, ProductStock } from '@prisma/client';

describe('ClientController', () => {
  let controller: ClientController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService, PrismaService, ConfigService, S3Service]
    }).compile();

    controller = module.get<ClientController>(ClientController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar as operações de produto para um cliente com sucesso', () => {
    const MOCK_PRODUCT_01: Product = {
      id: '1',
      name: 'Produto 01',
      description: 'Descrição do produto 01',
      price: 100,
      ratings: 5,
      category: 'OUTROS',
      markedImageID: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }
    const MOCK_PRODUCT_02: Product = {
      id: '2',
      name: 'Produto 02',
      description: 'Descrição do produto 02',
      price: 200,
      ratings: 4,
      category: 'OUTROS',
      markedImageID: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }
    const MOCK_PRODUCT_01_STOCK: ProductStock = {
      id: '1',
      productId: MOCK_PRODUCT_01.id,
      total: 10,
      unit: 'UNIDADE',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }
    const MOCK_PRODUCT_02_STOCK: ProductStock = {
      id: '2',
      productId: MOCK_PRODUCT_02.id,
      total: 20,
      unit: 'UNIDADE',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }

    it('deve retornar o total dos produtos', async () => {
      // Setup
      db.product.count = jest.fn().mockReturnValueOnce(2)
      db.product.findFirst = jest.fn().mockImplementation((args) => {
        const order = args.orderBy.price
        if (order === 'asc') {
          return MOCK_PRODUCT_01
        }
        return MOCK_PRODUCT_02
      })

      // Teste
      const res = await controller.getTotalProducts();
      expect(res).toBeDefined();
      expect(res.total).toBe(2);
      expect(res.mostCheap).toBe(MOCK_PRODUCT_01.price);
      expect(res.mostExpensive).toBe(MOCK_PRODUCT_02.price);
    })

    it('deve retornar todos os produtos', async () => {
      // Setup
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT_01, MOCK_PRODUCT_02])

      // Teste
      const products = await controller.getAllProducts(null, null, {});
      expect(products).toBeDefined();
      expect(products.length).toBe(2);
      expect(products[0].id).toBe(MOCK_PRODUCT_01.id);
      expect(products[1].id).toBe(MOCK_PRODUCT_02.id);
    })

    it('deve retornar um produto por id', async () => {
      // Setup
      db.product.findUnique = jest.fn().mockReturnValueOnce(MOCK_PRODUCT_01)

      // Teste
      const product = await controller.getProductById(MOCK_PRODUCT_01.id);
      expect(product).toBeDefined();
      expect(product.id).toBe(MOCK_PRODUCT_01.id);
    })
  })
});
