import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../aws/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { Cart, CartItems, Product } from '@prisma/client';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService, PrismaService, S3Service, ConfigService]
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de carrinho com sucesso', () => {
    const CLIENT_ID: string = '1'
    const CART_ID: string = '1'
    const PRODUCT_ID: string = '1'

    it('deve retornar o carrinho do cliente quando já existir algum', async () => {
      db.cart.findFirst = jest.fn().mockReturnValueOnce({
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      })

      const cart = await controller.getOpenCart(CLIENT_ID)
      expect(cart).toBeDefined()
      expect(cart.products.length).toBe(0)
      expect(cart.id).toBe(CART_ID)
    })

    it('deve criar um novo carrinho para clientes que não possuem nenhum', async () => {
      db.cart.create = jest.fn().mockReturnValueOnce({
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      })

      const cart = await controller.getOpenCart(CLIENT_ID)
      expect(cart).toBeDefined()
      expect(cart.products.length).toBe(0)
      expect(cart.id).toBe(CART_ID)
    })

    it('deve adicionar um novo produto ao carrinho', async () => {
      // Setup
      const MOCK_CART: Cart = {
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      }

      const MOCK_PRODUCT: Product = {
        id: PRODUCT_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 10,
        ratings: 5,
        category: 'OUTROS',
        markedImageID: null,
      }

      const MOCK_CART_PRODUCT: CartItems = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: MOCK_PRODUCT.id,
        cartId: CART_ID,
        amount: 1,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART)
      db.cartItems.create = jest.fn().mockReturnValueOnce(null)

      db.cartItems.findMany = jest.fn().mockReturnValueOnce([MOCK_CART_PRODUCT])
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT])

      // Teste
      const cart = await controller.addProduct(CLIENT_ID, PRODUCT_ID)
      expect(cart).toBeDefined()
      expect(cart.id).toBe(CART_ID)
      expect(cart.products.length).toBe(1)
    })

    it('deve somar a quantidade de um produto no carrinho', async () => {
      // Setup
      const MOCK_CART: Cart = {
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      }

      const MOCK_PRODUCT: Product = {
        id: PRODUCT_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 10,
        ratings: 5,
        category: 'OUTROS',
        markedImageID: null,
      }

      let MOCK_CART_PRODUCT: CartItems = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: MOCK_PRODUCT.id,
        cartId: CART_ID,
        amount: 1,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART)
      // Define que o produto já existe no carrinho
      db.cartItems.findFirst = jest.fn().mockReturnValueOnce(MOCK_CART_PRODUCT)
      // Incrementa em 1 a variável MOCK_CART_PRODUCT.amount toda vez que o método for chamado
      db.cartItems.updateMany = jest.fn().mockImplementation(async () => {
        MOCK_CART_PRODUCT.amount++
        return MOCK_CART_PRODUCT
      })

      db.cartItems.findMany = jest.fn().mockReturnValueOnce([MOCK_CART_PRODUCT])
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT])

      // Teste
      const cart = await controller.addProduct(CLIENT_ID, PRODUCT_ID)
      expect(cart).toBeDefined()
      expect(cart.id).toBe(CART_ID)
      expect(cart.products.length).toBe(1)
      expect(cart.products[0].amount).toBe(2)
    })

    it('deve remover um produto do carrinho', async () => {
      // Setup
      const MOCK_CART: Cart = {
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      }

      const MOCK_PRODUCT: Product = {
        id: PRODUCT_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 10,
        ratings: 5,
        category: 'OUTROS',
        markedImageID: null,
      }

      const MOCK_CART_PRODUCT: CartItems = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: MOCK_PRODUCT.id,
        cartId: CART_ID,
        amount: 2,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART)
      // Define que o produto já existe no carrinho
      db.cartItems.findFirst = jest.fn().mockReturnValueOnce(MOCK_CART_PRODUCT)
      // Decrementa em 1 a variável MOCK_CART_PRODUCT.amount toda vez que o método for chamado
      db.cartItems.updateMany = jest.fn().mockImplementation(async () => {
        MOCK_CART_PRODUCT.amount--
        return MOCK_CART_PRODUCT
      })

      db.cartItems.findMany = jest.fn().mockReturnValueOnce([MOCK_CART_PRODUCT])
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT])

      // Teste
      const cart = await controller.removeProduct(CLIENT_ID, PRODUCT_ID)
      expect(cart).toBeDefined()
      expect(cart.id).toBe(CART_ID)
      expect(cart.products.length).toBe(1)
      expect(cart.products[0].amount).toBe(1)
    })

    it('deve apagar um produto do carrinho caso a quantidade seja <= 1', async () => {
      // Setup
      const MOCK_CART: Cart = {
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      }

      const MOCK_PRODUCT: Product = {
        id: PRODUCT_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 10,
        ratings: 5,
        category: 'OUTROS',
        markedImageID: null,
      }

      const MOCK_CART_PRODUCT: CartItems = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: MOCK_PRODUCT.id,
        cartId: CART_ID,
        amount: 1,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART)
      // Define que o produto já existe no carrinho
      db.cartItems.findFirst = jest.fn().mockReturnValueOnce(MOCK_CART_PRODUCT)
      db.cartItems.deleteMany = jest.fn().mockReturnValueOnce(null)

      // Teste
      const cart = await controller.removeProduct(CLIENT_ID, PRODUCT_ID)
      expect(cart).toBeDefined()
      expect(db.cartItems.deleteMany).toHaveBeenCalledTimes(1)

      expect(cart.id).toBe(CART_ID)
      expect(cart.products.length).toBe(0)
    })

    it('deve retornar o preço do carrinho', async () => {
      // Setup
      const MOCK_CART: Cart = {
        id: CART_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        clientId: CLIENT_ID,
        status: 'OPEN',
      }

      const MOCK_PRODUCT: Product = {
        id: PRODUCT_ID,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Produto 1',
        description: 'Descrição do produto 1',
        price: 99.99,
        ratings: 5,
        category: 'OUTROS',
        markedImageID: null,
      }

      const MOCK_CART_PRODUCT: CartItems = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: MOCK_PRODUCT.id,
        cartId: CART_ID,
        amount: 10,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART)
      db.cartItems.findMany = jest.fn().mockReturnValueOnce([MOCK_CART_PRODUCT])
      db.product.findMany = jest.fn().mockReturnValueOnce([MOCK_PRODUCT])

      // Teste
      const price = await controller.getCartPrice(CLIENT_ID)
      expect(price).toBeDefined()
      expect(price).toBe(MOCK_PRODUCT.price * MOCK_CART_PRODUCT.amount)
    })
  })
});
