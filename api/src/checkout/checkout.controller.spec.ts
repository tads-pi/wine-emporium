import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CartService } from '../cart/cart.service';
import { S3Service } from '../aws/s3/s3.service';
import { Address, BankSlipPaymentMethod, Cart, Checkout, CreditCard, CreditCardPaymentMethod, Deliverer, Payment, PaymentMethod } from '@prisma/client';
import { SetCheckoutPaymentMethodDTO } from './dto';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let service: CheckoutService;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [CheckoutService, PrismaService, ConfigService, CartService, S3Service]
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
    service = module.get<CheckoutService>(CheckoutService);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de checkout com sucesso', () => {
    const CLIENT_ID: string = '1'
    const MOCK_CART_01: Cart = {
      id: '1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: CLIENT_ID,
      status: 'OPEN',
    }
    const MOCK_CART_02: Cart = {
      id: '2',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: CLIENT_ID,
      status: 'DONE',
    }


    const MOCK_CHECKOUT_01: Checkout = {
      id: '1',
      sequentialId: 1,
      deleteAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      addressId: null,
      paymentId: null,
      delivererId: null,
      cartId: MOCK_CART_01.id,
      status: 'ENDERECO_PENDENTE'
    }

    const MOCK_CHECKOUT_02: Checkout = {
      id: '2',
      sequentialId: 2,
      deleteAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      addressId: '1',
      paymentId: '1',
      delivererId: '1',
      cartId: MOCK_CART_02.id,
      status: 'ENTREGUE'
    }

    it('deve retornar a lista de checkouts do cliente', async () => {
      // Setup
      db.cart.findMany = jest.fn().mockReturnValueOnce([MOCK_CART_01, MOCK_CART_02])
      db.checkout.findMany = jest.fn().mockReturnValueOnce([MOCK_CHECKOUT_01, MOCK_CHECKOUT_02])

      // mocka resultados de busca de carrinho por id
      db.cart.findFirst = jest.fn().mockImplementation((args) => {
        switch (args.where.id) {
          case MOCK_CART_01.id:
            return MOCK_CART_01
          case MOCK_CART_02.id:
            return MOCK_CART_02
          default:
            return null
        }
      })

      // Teste
      const checkouts = await controller.listCheckout(CLIENT_ID)
      expect(checkouts).toBeDefined()
      expect(checkouts.length).toBe(2)
      expect(checkouts[0].id).toBe(MOCK_CHECKOUT_01.id)
      expect(checkouts[0].price).toBe(0)
      expect(checkouts[1].id).toBe(MOCK_CHECKOUT_02.id)
      expect(checkouts[1].price).toBe(0)
    })

    it('deve continuar um checkout para o cliente', async () => {
      // Setup
      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(MOCK_CHECKOUT_01)

      // Teste
      const c = await controller.startCheckout(CLIENT_ID)
      expect(c).toBeDefined()
      expect(c.id).toBe(MOCK_CHECKOUT_01.id)
      expect(c.price).toBe(0)
    })

    it('deve criar um novo checkout para o cliente', async () => {
      // Setup
      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(null)

      db.checkout.create = jest.fn().mockReturnValueOnce(MOCK_CHECKOUT_01)

      // Teste
      const c = await controller.startCheckout(CLIENT_ID)
      expect(c).toBeDefined()
      expect(c.id).toBe(MOCK_CHECKOUT_01.id)
      expect(c.price).toBe(0)
    })

    it('deve cancelar um checkout em andamento', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_01

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(CHECKOUT)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      // Teste
      const c = await controller.cancelCheckout(CLIENT_ID)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.status).toBe('CANCELADO')
    })

    it('deve finalizar um checkout', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_02

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_02)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(CHECKOUT)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      // Teste
      const c = await controller.finishCheckout(CLIENT_ID)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.status).toBe('PAGAMENTO_PENDENTE')
    })

    it('deve retornar um checkout pelo ID', async () => {
      // Setup
      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findUnique = jest.fn().mockReturnValueOnce(MOCK_CHECKOUT_01)

      // Teste
      const c = await controller.getCheckoutById(CLIENT_ID, MOCK_CHECKOUT_01.id)
      expect(c).toBeDefined()
      expect(c.id).toBe(MOCK_CHECKOUT_01.id)
    })

    it('deve definir o endereço de entrega', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_01

      const MOCK_ADDRESS: Address = {
        id: '1',
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        country: 'Brasil',
        state: 'Estado 1',
        city: 'Cidade 1',
        neighborhood: 'Bairro 1',
        street: 'Rua 1',
        number: '1',
        complement: 'Casa',
        zip: '12345-678',
      }

      db.checkout.findUnique = jest.fn().mockReturnValueOnce(CHECKOUT)
      db.address.findUnique = jest.fn().mockReturnValue(MOCK_ADDRESS)

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.addressId = args.data.addressId
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      // Teste
      const c = await controller.setCheckoutAddress(CLIENT_ID, CHECKOUT.id, MOCK_ADDRESS.id)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.address.id).toBe(MOCK_ADDRESS.id)
      expect(c.status).toBe('ENTREGADOR_PENDENTE')
    })

    it('deve definir o entregador', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_01

      const MOCK_DELIVERER: Deliverer = {
        id: '1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Entregador 1',
        fare: 10.99,
      }

      db.checkout.findUnique = jest.fn().mockReturnValueOnce(CHECKOUT)
      db.deliverer.findUnique = jest.fn().mockReturnValue(MOCK_DELIVERER)

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.delivererId = args.data.delivererId
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      // Teste
      const c = await controller.setCheckoutDeliverer(CLIENT_ID, CHECKOUT.id, MOCK_DELIVERER.id)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.deliverer.id).toBe(MOCK_DELIVERER.id)
      expect(c.status).toBe('METODO_DE_PAGAMENTO_PENDENTE')
    })

    it('deve definir o método de pegamento (cartao de credito)', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_01
      const PAYMENT_METHOD_CREDIT_CARD: PaymentMethod = {
        id: '123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'CARTAO_DE_CREDITO',
        friendlyName: 'Cartão de crédito',
      }
      const MOCK_PAYMENT: Payment = {
        id: '1111',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        methodId: PAYMENT_METHOD_CREDIT_CARD.id,
      }
      const MOCK_CREDIT_CARD: CreditCard = {
        id: '132',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        full_name: 'Fulano de Tal',
        number: '1234123412341234',
        cvv: '123',
        expireMonth: 12,
        expireYear: 2021,
        flag: 'VISA',
      }
      const MOCK_CREDIT_CARD_PAYMENT_METHOD: CreditCardPaymentMethod = {
        id: '142',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        installments: 1,
        installmentsValue: 100,
        dueDate: 1,
        paymentId: MOCK_PAYMENT.id,
        creditCardId: MOCK_CREDIT_CARD.id,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(CHECKOUT)

      db.paymentMethod.findFirst = jest.fn().mockReturnValue(PAYMENT_METHOD_CREDIT_CARD)
      db.payment.create = jest.fn().mockReturnValueOnce(MOCK_PAYMENT)
      db.creditCard.findUnique = jest.fn().mockReturnValue(MOCK_CREDIT_CARD)
      db.creditCardPaymentMethod.create = jest.fn().mockReturnValueOnce(MOCK_CREDIT_CARD_PAYMENT_METHOD)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.paymentId = args.data.paymentId
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      db.payment.findUnique = jest.fn().mockReturnValueOnce(MOCK_PAYMENT)
      db.creditCardPaymentMethod.findFirst = jest.fn().mockReturnValueOnce(MOCK_CREDIT_CARD_PAYMENT_METHOD)

      // Teste
      const input: SetCheckoutPaymentMethodDTO = {
        paymentMethod: 'credit-card',
        methodId: MOCK_CREDIT_CARD.id,
        installments: 1,
        installmentsValue: 100,
        dueDate: 1,
      }

      const c = await controller.setCheckoutPaymentMethod(CLIENT_ID, CHECKOUT.id, input)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.payment.id).toBe(MOCK_PAYMENT.id)
      expect(c.payment.bankSlip).toBe(false)
      expect(c.payment.creditCard.id).toBe(MOCK_CREDIT_CARD.id)
      expect(c.status).toBe('PAGAMENTO_PENDENTE')
    })

    it('deve definir o método de pegamento (boleto)', async () => {
      // Setup
      let CHECKOUT: Checkout = MOCK_CHECKOUT_01
      const PAYMENT_METHOD_BANK_SLIP: PaymentMethod = {
        id: '132',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'BOLETO',
        friendlyName: 'Boleto',
      }
      const MOCK_PAYMENT: Payment = {
        id: '141',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        methodId: PAYMENT_METHOD_BANK_SLIP.id,
      }
      const MOCK_BANK_SLIP_PAYMENT_METHOD: BankSlipPaymentMethod = {
        id: '111',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        installments: 1,
        installmentsValue: 100,
        dueDate: 1,
        paymentId: MOCK_PAYMENT.id,
      }

      db.cart.findFirst = jest.fn().mockReturnValue(MOCK_CART_01)
      db.checkout.findFirst = jest.fn().mockReturnValueOnce(CHECKOUT)

      db.paymentMethod.findFirst = jest.fn().mockReturnValue(PAYMENT_METHOD_BANK_SLIP)
      db.payment.create = jest.fn().mockReturnValueOnce(MOCK_PAYMENT)
      db.bankSlipPaymentMethod.create = jest.fn().mockReturnValueOnce(MOCK_BANK_SLIP_PAYMENT_METHOD)

      db.checkout.update = jest.fn().mockImplementation((args) => {
        CHECKOUT.paymentId = args.data.paymentId
        CHECKOUT.status = args.data.status
        return CHECKOUT
      })

      db.payment.findUnique = jest.fn().mockReturnValueOnce(MOCK_PAYMENT)
      db.bankSlipPaymentMethod.findFirst = jest.fn().mockReturnValueOnce(MOCK_BANK_SLIP_PAYMENT_METHOD)

      // Teste
      const input: SetCheckoutPaymentMethodDTO = {
        paymentMethod: 'bank-slip',
        methodId: null,
        installments: 1,
        installmentsValue: 100,
        dueDate: 1,
      }

      const c = await controller.setCheckoutPaymentMethod(CLIENT_ID, CHECKOUT.id, input)
      expect(c).toBeDefined()
      expect(db.checkout.update).toHaveBeenCalledTimes(1)

      expect(c.id).toBe(CHECKOUT.id)
      expect(c.payment.id).toBe(MOCK_PAYMENT.id)
      expect(c.payment.bankSlip).toBe(true)
      expect(c.payment.creditCard).toBeNull()
      expect(c.status).toBe('PAGAMENTO_PENDENTE')
    })

  })
});
