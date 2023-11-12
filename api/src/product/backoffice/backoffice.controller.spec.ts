import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeController } from './backoffice.controller';
import { BackofficeService } from './backoffice.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { S3Service } from 'src/aws/s3/s3.service';
import { Product, ProductStock } from '@prisma/client';
import { SaveProductDTO, UpdateProductStockDTO } from '../dto';

describe('BackofficeController', () => {
  let controller: BackofficeController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeController],
      providers: [BackofficeService, PrismaService, ConfigService, AuthService, S3Service]
    }).compile();

    controller = module.get<BackofficeController>(BackofficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de backoffice com sucesso', () => {
    const MOCK_PRODUCT_01: Product = {
      id: '1',
      name: 'Produto 01',
      description: 'Descrição do produto 01',
      price: 100,
      ratings: 5,
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

    it('deve retornar o total de produtos', async () => {
      // Setup
      db.product.count = jest.fn().mockReturnValueOnce(2)

      // Total
      const total = await controller.getTotalProducts()
      expect(total).toBeDefined()
      expect(total).toBe(2)
    })

    it('deve retornar todos os produtos', async () => {
      // Setup
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT_01, MOCK_PRODUCT_02])
      db.productStock.findMany = jest.fn().mockImplementation(async ({ where }) => {
        switch (where.productId) {
          case MOCK_PRODUCT_01.id:
            return [MOCK_PRODUCT_01_STOCK]
          case MOCK_PRODUCT_02.id:
            return [MOCK_PRODUCT_02_STOCK]
          default:
            return []
        }
      })

      // Teste
      const products = await controller.getAllProducts(null, null, null)
      expect(products).toBeDefined()
      expect(products.length).toBe(2)
      expect(products[0].id).toBe(MOCK_PRODUCT_01.id)
      expect(products[1].id).toBe(MOCK_PRODUCT_02.id)
    })

    it('deve retornar um produto por ID', async () => {
      // Setup
      db.product.findUnique = jest.fn().mockImplementation(async ({ where }) => {
        switch (where.id) {
          case MOCK_PRODUCT_01.id:
            return MOCK_PRODUCT_01
          case MOCK_PRODUCT_02.id:
            return MOCK_PRODUCT_02
          default:
            return null
        }
      })
      db.productStock.findMany = jest.fn().mockImplementation(async ({ where }) => {
        switch (where.productId) {
          case MOCK_PRODUCT_01.id:
            return [MOCK_PRODUCT_01_STOCK]
          case MOCK_PRODUCT_02.id:
            return [MOCK_PRODUCT_02_STOCK]
          default:
            return []
        }
      })

      // Teste
      const product = await controller.getProductById(MOCK_PRODUCT_01.id)
      expect(product).toBeDefined()
      expect(product.id).toBe(MOCK_PRODUCT_01.id)
    })

    it('deve salvar um produto', async () => {
      // Setup
      db.product.create = jest.fn().mockReturnValueOnce(MOCK_PRODUCT_01)
      db.productStock.create = jest.fn().mockReturnValueOnce(MOCK_PRODUCT_01_STOCK)

      // Teste
      const input: SaveProductDTO = {
        name: MOCK_PRODUCT_01.name,
        description: MOCK_PRODUCT_01.description,
        price: MOCK_PRODUCT_01.price,
        ratings: MOCK_PRODUCT_01.ratings,
      }

      const product = await controller.saveProduct(input)
      expect(product).toBeDefined()
      expect(product.id).toBe(MOCK_PRODUCT_01.id)
    })

    it('deve atualizar um produto', async () => {
      // Setup
      const PRODUCT = MOCK_PRODUCT_01

      db.product.findUnique = jest.fn().mockReturnValueOnce(PRODUCT)
      db.product.update = jest.fn().mockImplementation(async ({ data }) => {
        PRODUCT.name = data.name
        return PRODUCT
      })

      // Teste
      const NEW_NAME = 'Produto 01 atualizado'
      const input: SaveProductDTO = {
        name: NEW_NAME,
        description: PRODUCT.description,
        price: PRODUCT.price,
        ratings: PRODUCT.ratings,
      }

      const product = await controller.updateProduct(PRODUCT.id, input)
      expect(product).toBeDefined()
      expect(db.product.update).toHaveBeenCalledTimes(1)
      expect(product.id).toBe(PRODUCT.id)
      expect(product.name).toBe(NEW_NAME)
    })

    it('deve atualizar o estoque de um produto', async () => {
      // Setup
      const STOCK = MOCK_PRODUCT_01_STOCK

      db.product.findUnique = jest.fn().mockReturnValueOnce(MOCK_PRODUCT_01)
      db.productStock.update = jest.fn().mockImplementation(async ({ data }) => {
        STOCK.total = data.total
        return STOCK
      })

      // Teste
      const NEW_TOTAL = 100
      const input: UpdateProductStockDTO = {
        stock_id: STOCK.id,
        total: NEW_TOTAL,
      }

      const product = await controller.updateProductStock(MOCK_PRODUCT_01.id, input)
      expect(product).toBeDefined()
      expect(db.productStock.update).toHaveBeenCalledTimes(1)
      expect(product.id).toBe(STOCK.id)
      expect(product.stock).toBe(NEW_TOTAL)
    })

    it('deve desativar um produto', async () => {
      // Setup
      const PRODUCT = MOCK_PRODUCT_01

      db.product.findUnique = jest.fn().mockReturnValueOnce(PRODUCT)
      db.product.update = jest.fn().mockImplementation(async ({ data }) => {
        PRODUCT.active = data.active
        return PRODUCT
      })

      // Teste
      const res = await controller.toggleProductActive(PRODUCT.id)
      expect(res).toBeNull()
      expect(db.product.update).toHaveBeenCalledTimes(1)
      expect(PRODUCT.active).toBe(false)
    })
  })
});
