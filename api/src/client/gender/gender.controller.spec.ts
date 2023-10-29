import { Test, TestingModule } from '@nestjs/testing';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('GenderController', () => {
  let controller: GenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderController],
      providers: [GenderService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<GenderController>(GenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllGenders', () => {
    it('deve retornar todos os gêneros', async () => {
      const genders = await controller.getAllGenders()
      expect(genders).toHaveLength(6)
    })
  })
});
