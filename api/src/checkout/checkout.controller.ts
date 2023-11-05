import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtGuard } from 'src/auth/guard';
import { GetClient } from 'src/client/decorator/client.decorator';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';

@Controller('checkout')
@UseGuards(JwtGuard)
export class CheckoutController {
    constructor(
        private svc: CheckoutService
    ) { }

    @Get('')
    async listCheckout(
        @GetClient('id') clientId: string,
    ): Promise<CheckoutViewmodel[]> {
        return this.svc.listCheckout(clientId);
    }

    @Get(':id')
    async getCheckoutById(
        @GetClient('id') clientId: string,
        @Param('id') id: string
    ): Promise<CheckoutViewmodel> {
        return this.svc.getCheckoutById(clientId, id)
    }

    @Post('start')
    async startCheckout(
        @GetClient('id') clientId: string
    ): Promise<null> {
        return this.svc.startCheckout(clientId)
    }
}
