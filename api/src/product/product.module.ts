import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { BackofficeService } from './backoffice/backoffice.service';
import { BackofficeController } from './backoffice/backoffice.controller';

@Module({
  providers: [ClientService, BackofficeService],
  controllers: [ClientController, BackofficeController]
})
export class ProductModule {}
