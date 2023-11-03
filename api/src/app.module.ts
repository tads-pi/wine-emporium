import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from './checkout/address/address.controller';
import { AddressService } from './checkout/address/address.service';
import { DelivererService } from './checkout/deliverer/deliverer.service';
import { DelivererController } from './checkout/deliverer/deliverer.controller';
import { CheckoutController } from './checkout/checkout.controller';
import { CheckoutService } from './checkout/checkout.service';
import { CheckoutModule } from './checkout/checkout.module';
import { AwsModule } from './aws/aws.module';

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
    AwsModule
  ],
  controllers: [AddressController, DelivererController, CheckoutController],
  providers: [AddressService, DelivererService, CheckoutService],
})
export class AppModule { }
