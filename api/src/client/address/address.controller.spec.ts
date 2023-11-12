import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AddressService } from './address.service';
import { Client, ClientAddress } from '@prisma/client';
import { SaveAddressDTO } from './dto/save-address.dto';

describe('AddressController', () => {
  let controller: AddressController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de endereço com sucesso', () => {
    const MOCK_CLIENT: Client = {
      id: '1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@clientmail.com',
      document: '12345678900',
      name: 'test client',
      password: '123456',
      birthDate: new Date(),
      genderId: '1',
      markedAddressID: '1',
    }
    const MOCK_ADDRESS_01 = {
      id: '1',
      country: 'Brasil',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Vila Olimpia',
      street: 'Rua Fidencio Ramos',
      number: '308',
      complement: 'AP 12',
      cep: '04551-010',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    const MOCK_ADDRESS_02 = {
      id: '2',
      country: 'Brasil',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Vila Olimpia',
      street: 'Rua Fidencio Ramos',
      number: '308',
      complement: 'AP 12',
      cep: '04551-010',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    const MOCK_CLIENT_ADDRESS_01: ClientAddress = {
      id: '1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: MOCK_CLIENT.id,
      addressId: MOCK_ADDRESS_01.id,
    }
    const MOCK_CLIENT_ADDRESS_02: ClientAddress = {
      id: '1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: MOCK_CLIENT.id,
      addressId: MOCK_ADDRESS_02.id,
    }

    it('deve listar os endereços do cliente', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockReturnValueOnce(MOCK_CLIENT)
      db.clientAddress.findMany = jest.fn().mockReturnValueOnce([MOCK_CLIENT_ADDRESS_01, MOCK_CLIENT_ADDRESS_02])
      db.address.findMany = jest.fn().mockReturnValueOnce([MOCK_ADDRESS_01, MOCK_ADDRESS_02])

      // Teste
      const a = await controller.listAddress(MOCK_CLIENT.id)
      expect(a).toBeDefined()
      expect(a.length).toBe(2)
    })

    it('deve marcar um endereço como principal', async () => {
      // Setup
      const CLIENT = MOCK_CLIENT

      db.clientAddress.findFirst = jest.fn().mockReturnValueOnce(MOCK_CLIENT_ADDRESS_01)
      db.address.findUnique = jest.fn().mockReturnValueOnce(MOCK_ADDRESS_01)
      db.client.update = jest.fn().mockImplementation((args) => {
        CLIENT.markedAddressID = args.data.markedAddressID
      })

      // Teste
      const a = await controller.markAddress(MOCK_CLIENT.id, MOCK_ADDRESS_01.id)
      expect(a).toBeNull()
      expect(db.client.update).toHaveBeenCalledTimes(1)
      expect(CLIENT.markedAddressID).toBe(MOCK_ADDRESS_01.id)
    })

    it('deve deletar um endereço', async () => {
      // Setup
      const ADDRESS = MOCK_ADDRESS_01

      db.clientAddress.findFirst = jest.fn().mockReturnValueOnce(MOCK_CLIENT_ADDRESS_01)
      db.address.update = jest.fn().mockImplementation((args) => {
        ADDRESS.deletedAt = args.data.deletedAt
      })

      // Teste
      const a = await controller.deleteAddress(MOCK_CLIENT.id, MOCK_ADDRESS_01.id)
      expect(a).toBeNull()
      expect(db.address.update).toHaveBeenCalledTimes(1)
      expect(ADDRESS.deletedAt).not.toBeNull()
    })

    it('deve criar um novo endereço', async () => {
      // Setup
      const ADDRESS: SaveAddressDTO = {
        country: MOCK_ADDRESS_01.country,
        state: MOCK_ADDRESS_01.state,
        city: MOCK_ADDRESS_01.city,
        neighborhood: MOCK_ADDRESS_01.neighborhood,
        street: MOCK_ADDRESS_01.street,
        number: MOCK_ADDRESS_01.number,
        complement: MOCK_ADDRESS_01.complement,
        zip: MOCK_ADDRESS_01.cep,
      }

      db.address.create = jest.fn().mockReturnValueOnce(MOCK_ADDRESS_01)
      db.clientAddress.create = jest.fn().mockReturnValueOnce(null)

      // Teste
      const a = await controller.createAddress(MOCK_CLIENT.id, ADDRESS)
      expect(a).toBeDefined()
      expect(db.address.create).toHaveBeenCalledTimes(1)
      expect(db.clientAddress.create).toHaveBeenCalledTimes(1)
    })

    it('deve retornar um endereço por ID', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockReturnValueOnce(MOCK_CLIENT)
      db.clientAddress.findFirst = jest.fn().mockReturnValueOnce(MOCK_CLIENT_ADDRESS_01)
      db.address.findUnique = jest.fn().mockReturnValueOnce(MOCK_ADDRESS_01)

      // Teste
      const a = await controller.getAddressByID(MOCK_CLIENT.id, MOCK_ADDRESS_01.id)
      expect(a).toBeDefined()
      expect(db.address.findUnique).toHaveBeenCalledTimes(1)
      expect(a.id).toBe(MOCK_ADDRESS_01.id)
    })
  })
});
