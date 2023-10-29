import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';

@Module({
  providers: [ClientService, AddressService],
  controllers: [AddressController]
})
export class ClientModule {}
