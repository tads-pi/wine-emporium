import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { GenderController } from './gender/gender.controller';
import { GenderService } from './gender/gender.service';
import { GenderModule } from './gender/gender.module';
import { AddressModule } from './address/address.module';

@Module({
  providers: [ClientService, AddressService, GenderService],
  controllers: [AddressController, GenderController],
  imports: [GenderModule, AddressModule]
})
export class ClientModule {}
