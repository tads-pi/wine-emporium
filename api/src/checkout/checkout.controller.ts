import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtGuard } from '../auth/guard';
import { GetClient } from '../client/decorator/client.decorator';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('checkout')
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
    ): Promise<CheckoutViewmodel> {
        return this.svc.startCheckout(clientId)
    }

    @Post('cancel')
    async cancelCheckout(
        @GetClient('id') clientId: string
    ): Promise<CheckoutViewmodel> {
        return this.svc.cancelCheckout(clientId)
    }

    @Post('finish')
    async finishCheckout(
        @GetClient('id') clientId: string
    ): Promise<CheckoutViewmodel> {
        return this.svc.finishCheckout(clientId)
    }
}
