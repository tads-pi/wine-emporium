import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { PrismaController } from './prisma/prisma.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ProductModule, CartModule, PaymentModule, AdminModule, ClientModule, PrismaModule],
  controllers: [PrismaController],
  providers: [],
})
export class AppModule {}
