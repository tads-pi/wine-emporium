import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Client, Gender } from '@prisma/client';
import { ClientService } from './client.service';
import { ClientSignUpDTO, ClientUpdateDTO } from './dto';

describe('ClientController', () => {
  let controller: ClientController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [PrismaService, ClientService, ConfigService, AuthService, JwtService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('deve realizar operações de cliente com sucesso', () => {
    const MOCK_GENDER: Gender = {
      id: '1',
      name: 'PREFIRO_NAO_INFORMAR',
      firiendlyName: 'Prefiro não informar',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null,
      active: true,
    }

    const MOCK_CLIENT: Client = {
      id: '1',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'email@clientmail.com',
      document: '12345678900',
      name: 'test client',
      password: '$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC', //password
      birthDate: new Date(),
      genderId: MOCK_GENDER.id,
      markedAddressID: null,
    }

    it('deve logar com sucesso', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockReturnValueOnce(MOCK_CLIENT)

      // Teste
      const res = await controller.clientSignIn({
        email: MOCK_CLIENT.email,
        password: 'password'
      })
      expect(res).toBeDefined()
      expect(res.access_token).not.toBeNull()
      expect(res.expires_in).not.toBeNull()
    })

    it('deve realizar o cadastro de um novo cliente', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockReturnValueOnce(null)
      db.gender.findUnique = jest.fn().mockReturnValueOnce(MOCK_GENDER)
      db.client.create = jest.fn().mockReturnValueOnce(MOCK_CLIENT)

      // Teste
      const input: ClientSignUpDTO = {
        email: MOCK_CLIENT.email,
        password: 'password',
        name: MOCK_CLIENT.name,
        birth_date: MOCK_CLIENT.birthDate.toString(),
        document: MOCK_CLIENT.document,
        genderId: MOCK_CLIENT.genderId,
      }

      const client = await controller.clientSignUp(input)
      expect(client).toBeDefined()
      expect(client.access_token).not.toBeNull()
      expect(client.expires_in).not.toBeNull()
    })

    it('deve atualizar os dados do cliente', async () => {
      // Setup
      const CLIENT = MOCK_CLIENT

      db.client.findUnique = jest.fn().mockReturnValueOnce(CLIENT)
      db.client.update = jest.fn().mockImplementationOnce((args) => {
        CLIENT.name = args.data.name
        return CLIENT
      })

      // Teste
      const NEW_NAME = 'new name'
      const input: ClientUpdateDTO = {
        name: NEW_NAME,
        password: null,
        birthDate: null,
        genderId: null,
      }

      const client = await controller.clientUpdate(MOCK_CLIENT.id, input)
      expect(client).toBeDefined()
      expect(client.name).toBe(NEW_NAME)
      expect(db.client.update).toHaveBeenCalledTimes(1)
    })

    it('deve retornar os dados do cliente logado', async () => {
      // Setup
      db.client.findUnique = jest.fn().mockReturnValueOnce(MOCK_CLIENT)

      // Teste
      const client = await controller.getMe(MOCK_CLIENT.id)
      expect(client).toBeDefined()
      expect(client.id).toBe(MOCK_CLIENT.id)
    })

  })
});
