import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtGuard } from '../../auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { GetClient } from '../../client/decorator/client.decorator';

@ApiTags('checkout')
@Controller('checkout/:checkoutId/payment')
@UseGuards(JwtGuard)
export class PaymentController {
    constructor(
        private svc: PaymentService
    ) { }

    @Post(':paymentId')
    async setCheckoutPaymentMethod(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('paymentId') paymentId: string,
    ): Promise<null> {
        return null
        // return this.svc.setCheckoutPaymentMethod(clientId, checkoutId, paymentId);
    }
}
