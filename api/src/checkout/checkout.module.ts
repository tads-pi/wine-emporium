import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CartService } from '../cart/cart.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, CartService]
})
export class CheckoutModule { }
