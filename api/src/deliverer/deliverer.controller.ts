import { Body, Controller, Get, Post } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererViewmodel } from './viewmodel';
import { ProductDelivererDTO } from './dto/product-deliverer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deliverer')
@Controller('deliverer')
export class DelivererController {
    constructor(
        private svc: DelivererService
    ) { }

    @Get('')
    async listDeliverers(): Promise<DelivererViewmodel[]> {
        return this.svc.listDeliverers()
    }

}
