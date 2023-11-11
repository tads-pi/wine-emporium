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

    @Post('/:checkoutId/address/:addressId')
    async setCheckoutAddress(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('addressId') addressId: string,
    ): Promise<null> {
        return this.svc.setCheckoutAddress(clientId, checkoutId, addressId);
    }

    @Post('/:checkoutId/deliverer/:delivererId')
    async setCheckoutDeliverer(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('delivererId') delivererId: string
    ): Promise<null> {
        return this.svc.setCheckoutDeliverer(clientId, checkoutId, delivererId);
    }

    @Post(':paymentId')
    async setCheckoutPaymentMethod(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('paymentId') paymentId: string,
    ): Promise<null> {
        return null
        // WORK IN PROGRESS HERE
        // return this.svc.setCheckoutPaymentMethod(clientId, checkoutId, paymentId);
    }
}
