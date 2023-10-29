import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [AuthModule, ProductModule, CartModule, PaymentModule, AdminModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
