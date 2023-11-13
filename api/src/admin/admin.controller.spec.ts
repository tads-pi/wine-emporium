import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BackofficeClient, BackofficeGroup } from '@prisma/client';
import { SaveBackofficeClientDTO } from './dto';
import { BackofficeClientViewmodel } from './viewmodel';

describe('AdminController', () => {
  let controller: AdminController;
  let db: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, PrismaService, ConfigService, AuthService, JwtService]
    }).compile();

    controller = module.get<AdminController>(AdminController);
    db = module.get<PrismaService>(PrismaService);
  });

  it('deve ser criado com sucesso', () => {
    expect(controller).toBeDefined();
  });

  describe('autenticação', () => {
    const ADMINISTRADOR_MOCK_GROUP: BackofficeGroup = {
      id: '123',
      name: 'ADMINISTRADOR',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }

    const ESTOQUISTA_MOCK_GROUP: BackofficeGroup = {
      id: '321',
      name: 'ESTOQUISTA',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }

    const MOCK_ADMIN: BackofficeClient = {
      id: '1',
      name: 'ADMINISTRADOR',
      document: '01234567890',
      email: 'mock@admin.com',
      password: '$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC', //password
      active: true,
      groupId: ADMINISTRADOR_MOCK_GROUP.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const MOCK_ESTOQUISTA: BackofficeClient = {
      id: '1',
      name: 'ESTOQUISTA',
      document: '00000000191',
      email: 'mock@estoquista.com',
      password: '$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC', //password
      active: true,
      groupId: ESTOQUISTA_MOCK_GROUP.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    it('deve retornar todos usuários do backoffice', async () => {
      // Setup
      db.backofficeClient.findMany = jest.fn().mockReturnValueOnce([MOCK_ADMIN, MOCK_ESTOQUISTA])
      // Retorna admin ou estoquista dependendo do ID
      db.backofficeGroup.findUnique = jest.fn().mockImplementation((args) => {
        if (args.where.id === ADMINISTRADOR_MOCK_GROUP.id) {
          return ADMINISTRADOR_MOCK_GROUP
        } else if (args.where.id === ESTOQUISTA_MOCK_GROUP.id) {
          return ESTOQUISTA_MOCK_GROUP
        } else {
          return null
        }
      })

      const users = await controller.getAllUsers()
      expect(users.length).toBe(2)
    })

    it('deve fazer login no backoffice com sucesso', async () => {
      db.backofficeClient.findUnique = jest.fn().mockReturnValueOnce(MOCK_ADMIN)

      const login = await controller.backofficeClientSignIn({
        email: MOCK_ADMIN.email,
        password: 'password',
      })
      expect(login).toBeDefined()
      expect(login).toHaveProperty('access_token')
      expect(login).toHaveProperty('expires_in')
      expect(login.access_token).not.toBeNull()
      expect(login.expires_in).not.toBeNull()
    })

    it('deve retornar erro caso a senha esteja incorreta', async () => {
      db.backofficeClient.findUnique = jest.fn().mockReturnValueOnce(MOCK_ADMIN)

      try {
        await controller.backofficeClientSignIn({
          email: MOCK_ADMIN.email,
          password: 'senha-errada',
        })
      } catch (err) {
        expect(err).toBeDefined()
        expect(err).not.toBeNull()
        expect(err.message).toBe('E-mail ou senha incorretos')
      }
    })

    it('deve retornar erro caso o email esteja incorreto', async () => {
      db.backofficeClient.findUnique = jest.fn().mockReturnValueOnce(null)

      try {
        await controller.backofficeClientSignIn({
          email: "email-errado",
          password: 'senha-errada',
        })
      } catch (err) {
        expect(err).toBeDefined()
        expect(err).not.toBeNull()
        expect(err.message).toBe('E-mail ou senha incorretos')
      }
    })
  })

  describe('crud', () => {
    const ESTOQUISTA_MOCK_GROUP: BackofficeGroup = {
      id: '321',
      name: 'ESTOQUISTA',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }

    const MOCK_BACKOFFICE_CLIENT: BackofficeClient = {
      id: '1',
      name: 'test-user',
      document: '01234567890',
      email: 'email@backoffice.com',
      password: '$2a$10$fHlpSahCN/xElXUFgg3YMevlIEwshS3nIbtcInOmTQtTNGUbi5jmC',
      groupId: ESTOQUISTA_MOCK_GROUP.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    }

    it('deve criar um usuário do backoffice com sucesso', async () => {
      // Setup
      const novoBackofficeClient: SaveBackofficeClientDTO = {
        name: MOCK_BACKOFFICE_CLIENT.name,
        document: MOCK_BACKOFFICE_CLIENT.document,
        email: MOCK_BACKOFFICE_CLIENT.email,
        groupId: MOCK_BACKOFFICE_CLIENT.groupId,
        password: 'password',
      }

      db.backofficeGroup.findUnique = jest.fn().mockReturnValueOnce(ESTOQUISTA_MOCK_GROUP)
      db.backofficeClient.create = jest.fn().mockReturnValueOnce(MOCK_BACKOFFICE_CLIENT)

      // Teste
      const res = await controller.saveUser(novoBackofficeClient)
      expect(res).toBeDefined()
      expect(res).not.toBeNull()
      expect(res).toBe(MOCK_BACKOFFICE_CLIENT.id)
    })

    it('deve retornar um usuário do backoffice pelo ID com sucesso', async () => {
      // Setup
      const BACKOFFICE_CLIENT: BackofficeClientViewmodel = {
        id: MOCK_BACKOFFICE_CLIENT.id,
        name: MOCK_BACKOFFICE_CLIENT.name,
        document: MOCK_BACKOFFICE_CLIENT.document,
        email: MOCK_BACKOFFICE_CLIENT.email,
        group: {
          id: ESTOQUISTA_MOCK_GROUP.id,
          name: ESTOQUISTA_MOCK_GROUP.name,
        },
        active: true,
      }

      db.backofficeClient.findUnique = jest.fn().mockReturnValueOnce(BACKOFFICE_CLIENT)
      db.backofficeGroup.findUnique = jest.fn().mockReturnValueOnce(ESTOQUISTA_MOCK_GROUP)

      // Teste
      const user = await controller.getUserById(BACKOFFICE_CLIENT.id)
      expect(user).toBeDefined()
      expect(user).not.toBeNull()
      expect(user).toHaveProperty('id')
      expect(user.id).toBe(BACKOFFICE_CLIENT.id)
      expect(user).toHaveProperty('name')
      expect(user.name).toBe(BACKOFFICE_CLIENT.name)
      expect(user).toHaveProperty('document')
      expect(user.document).toBe(BACKOFFICE_CLIENT.document)
      expect(user).toHaveProperty('email')
      expect(user.email).toBe(BACKOFFICE_CLIENT.email)
      expect(user).toHaveProperty('group')
      expect(user.group.id).toBe(ESTOQUISTA_MOCK_GROUP.id)
      expect(user.group.name).toBe(ESTOQUISTA_MOCK_GROUP.name)
      expect(user).toHaveProperty('active')
      expect(user.active).toBe(BACKOFFICE_CLIENT.active)
    })

    it('deve atualizar um usuário do backoffice com sucesso', async () => {
      // Setup
      const BACKOFFICE_CLIENT: BackofficeClientViewmodel = {
        id: MOCK_BACKOFFICE_CLIENT.id,
        name: MOCK_BACKOFFICE_CLIENT.name,
        document: MOCK_BACKOFFICE_CLIENT.document,
        email: MOCK_BACKOFFICE_CLIENT.email,
        group: {
          id: ESTOQUISTA_MOCK_GROUP.id,
          name: ESTOQUISTA_MOCK_GROUP.name,
        },
        active: true,
      }
      const NEW_NAME = 'test-user-updated'

      db.backofficeClient.findUnique = jest.fn().mockReturnValueOnce(MOCK_BACKOFFICE_CLIENT)
      db.backofficeGroup.findUnique = jest.fn().mockReturnValueOnce(ESTOQUISTA_MOCK_GROUP)
      // Define que o documento não está cadastrado ainda
      db.backofficeClient.findFirst = jest.fn().mockReturnValueOnce(null)

      // Mock da função de update
      db.backofficeClient.update = jest.fn().mockReturnValueOnce(null)

      // Teste
      const res = await controller.updateUser(
        BACKOFFICE_CLIENT.id,
        {
          name: NEW_NAME,
          document: BACKOFFICE_CLIENT.document,
          group: BACKOFFICE_CLIENT.group.name,
        }
      )
      expect(res).toBeNull()
      expect(db.backofficeClient.update).toHaveBeenCalledTimes(1)
    })
  })
});
