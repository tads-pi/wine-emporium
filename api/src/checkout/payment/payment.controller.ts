import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtGuard } from '../../auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { GetClient } from '../../client/decorator/client.decorator';
import { SetCheckoutPaymentMethodDTO } from './dto';

@ApiTags('checkout')
@Controller('checkout/:checkoutId/payment')
@UseGuards(JwtGuard)
export class PaymentController {
    constructor(
        private svc: PaymentService
    ) { }

    @Post('')
    async setCheckoutPaymentMethod(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Body() dto: SetCheckoutPaymentMethodDTO,
    ): Promise<null> {
        return this.svc.setCheckoutPaymentMethod(clientId, checkoutId, dto);
    }
}
