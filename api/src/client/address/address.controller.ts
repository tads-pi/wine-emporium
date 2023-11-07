import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { JwtGuard } from '../../auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { AddressViewmodel } from './viewmodel/address.viewmodel';
import { GetClient } from '../decorator/client.decorator';
import { SaveAddressDTO } from './dto/save-address.dto';

@ApiTags('client/address')
@Controller('client/address')
@UseGuards(JwtGuard)
export class AddressController {
    constructor(
        private svc: AddressService
    ) { }

    @Get('')
    async listAddress(
        @GetClient('id') clientID: string
    ): Promise<AddressViewmodel[]> {
        return await this.svc.listAddress(clientID);
    }

    @Post(':id/mark')
    async markAddress(
        @GetClient('id') clientID: string,
        @Param('id') addressID: string
    ): Promise<null> {
        return await this.svc.markAddress(clientID, addressID);
    }

    @Delete(':id')
    async deleteAddress(
        @GetClient('id') clientID: string,
        @Param('id') addressID: string
    ): Promise<null> {
        return await this.svc.deleteAddress(clientID, addressID);
    }

    @Post('')
    async createAddress(
        @GetClient('id') clientID: string,
        @Body() address: SaveAddressDTO
    ): Promise<null> {
        return await this.svc.createAddress(clientID, address);
    }

    @Get(':id')
    async getAddressByID(
        @GetClient('id') clientID: string,
        @Param('id') addressID: string
    ): Promise<AddressViewmodel> {
        return await this.svc.getAddressByID(clientID, addressID);
    }
}
