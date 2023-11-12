import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CheckoutModule } from './checkout/checkout.module';
import { AwsModule } from './aws/aws.module';
import { DelivererModule } from './deliverer/deliverer.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CartModule,
    PaymentModule,
    AdminModule,
    ClientModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CheckoutModule,
    AwsModule,
    DelivererModule
  ],
})
export class AppModule { }
