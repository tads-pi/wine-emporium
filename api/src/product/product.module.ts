import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { BackofficeService } from './backoffice/backoffice.service';
import { BackofficeController } from './backoffice/backoffice.controller';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';

@Module({
  providers: [ClientService, BackofficeService, ImageService],
  controllers: [ClientController, BackofficeController, ImageController]
})
export class ProductModule {}
