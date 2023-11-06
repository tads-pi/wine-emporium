import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { GetClient } from '../../client/decorator/client.decorator';
import { JwtGuard } from '../../auth/guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('checkout')
@Controller('checkout/:checkoutId/address')
@UseGuards(JwtGuard)
export class AddressController {
    constructor(
        private svc: AddressService
    ) { }

    @Post(':addressId')
    async setCheckoutAddress(
        @GetClient('id') clientId: string,
        @Param('checkoutId') checkoutId: string,
        @Param('addressId') addressId: string,
    ): Promise<null> {
        return this.svc.setCheckoutAddress(clientId, checkoutId, addressId);
    }
}
