import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Define que o módulo pode ser importado em qualquer lugar da aplicação
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
