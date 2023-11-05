import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { CartService } from './cart.service';
import { GetClient } from 'src/client/decorator/client.decorator';
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

    @Put('')
    async updateOpenCart(
        @GetClient('id') clientId: string,
        @Body() dto: UpdateCartDTO
    ): Promise<CartViewmodel> {
        return this.svc.updateOpenCart(clientId, dto)
    }

    @Get('price')
    async getCartPrice(
        @GetClient('id') clientId: string
    ): Promise<number> {
        return this.svc.getCartPrice(clientId)
    }

}
