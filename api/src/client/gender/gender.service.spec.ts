import { Test, TestingModule } from '@nestjs/testing';
import { GenderService } from './gender.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('GenderService', () => {
  let service: GenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderService, PrismaService, ConfigService],
    }).compile();

    service = module.get<GenderService>(GenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllGenders', () => {
    it('deve retornar todos os gêneros', async () => {
      const genders = await service.getAllGenders()
      expect(genders).toHaveLength(6)
    })
  })
});
