import { Module } from '@nestjs/common';
import { ProductService } from './product/product.service';
import { AuthService } from './auth.service';

@Module({
  providers: [ProductService, AuthService]
})
export class AuthModule {}
