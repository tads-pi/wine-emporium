import { Module } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererController } from './deliverer.controller';

@Module({
    providers: [DelivererService],
    controllers: [DelivererController],
})
export class DelivererModule { }
