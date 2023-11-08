import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { CartService } from './cart.service';
import { GetClient } from '../client/decorator/client.decorator';
import { CartViewmodel } from './viewmodel';
import { UpdateCartDTO } from './dto/update-cart.dto';

@ApiTags('client/cart')
@Controller('client/cart')
@UseGuards(JwtGuard)
export class CartController {
    constructor(
        private svc: CartService
    ) { }

    @Get('')
    async getOpenCart(
        @GetClient('id') clientId: string
    ): Promise<CartViewmodel> {
        return this.svc.getOpenCart(clientId)
    }

    @Put('/:productId')
    async addProduct(
        @GetClient('id') clientId: string,
        @Param('productId') productId: string,
    ): Promise<CartViewmodel> {
        return this.svc.addProduct(clientId, productId)
    }

    @Delete('/:productId')
    async removeProduct(
        @GetClient('id') clientId: string,
        @Param('productId') productId: string,
    ): Promise<CartViewmodel> {
        return this.svc.removeProduct(clientId, productId)
    }

    @Get('price')
    async getCartPrice(
        @GetClient('id') clientId: string
    ): Promise<number> {
        return this.svc.getCartPrice(clientId)
    }

}
