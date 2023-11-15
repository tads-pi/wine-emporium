import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { JwtGuard } from '../auth/guard';
import { GetClient } from '../client/decorator/client.decorator';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { ApiTags } from '@nestjs/swagger';
import { SetCheckoutPaymentMethodDTO } from './dto';

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

    @Get(':checkoutId')
    async getCheckoutById(
        @GetClient('id') clientId: string,
        @Param('checkoutId') id: string
    ): Promise<CheckoutViewmodel> {
        return this.svc.getCheckoutById(clientId, id)
    }

    @Post('/:checkoutId/address/:addressId')
    async setCheckoutAddress(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('addressId') addressId: string,
    ): Promise<CheckoutViewmodel> {
        return this.svc.setCheckoutAddress(clientId, checkoutId, addressId);
    }

    @Post('/:checkoutId/deliverer/:delivererId')
    async setCheckoutDeliverer(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('delivererId') delivererId: string
    ): Promise<CheckoutViewmodel> {
        return this.svc.setCheckoutDeliverer(clientId, checkoutId, delivererId);
    }

    @Post('/:checkoutId/payment')
    async setCheckoutPaymentMethod(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Body('') dto: SetCheckoutPaymentMethodDTO,
    ): Promise<CheckoutViewmodel> {
        return this.svc.setCheckoutPaymentMethod(clientId, checkoutId, dto);
    }

    @Get('/status')
    async listStatus(): Promise<string[]> {
        return this.svc.listStatus();
    }

    @Put('/:checkoutId/status/:status')
    async upadateStatus(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('status') status: string,
    ): Promise<CheckoutViewmodel> {
        return this.svc.updateStatus(clientId, checkoutId, status);
    }
}
