import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AddressService } from './address.service';

describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
