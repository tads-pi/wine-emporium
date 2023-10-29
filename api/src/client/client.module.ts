import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { GenderController } from './gender/gender.controller';
import { GenderService } from './gender/gender.service';

@Module({
  providers: [ClientService, AddressService, GenderService],
  controllers: [AddressController, GenderController]
})
export class ClientModule {}
