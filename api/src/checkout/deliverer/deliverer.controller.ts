import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { GetClient } from 'src/client/decorator/client.decorator';
import { DelivererViewmodel } from 'src/product/deliverer/viewmodel';
import { JwtGuard } from 'src/auth/guard';

@Controller('checkout/:checkoutId/deliverer')
@UseGuards(JwtGuard)
export class DelivererController {
    constructor(
        private svc: DelivererService,
    ) { }

    @Get('')
    async listDeliverers(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string
    ): Promise<DelivererViewmodel[]> {
        return this.svc.listDeliverers(clientId, checkoutId);
    }

    @Post(':delivererId')
    async setCheckoutDeliverer(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('delivererId') delivererId: string
    ): Promise<null> {
        return this.svc.setCheckoutDeliverer(clientId, checkoutId, delivererId);
    }
}
