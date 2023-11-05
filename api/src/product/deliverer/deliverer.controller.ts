import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererViewmodel } from './viewmodel';
import { ProductDelivererDTO } from './dto/product-deliverer.dto';

@Controller('product/deliverer')
export class DelivererController {
    constructor(
        private svc: DelivererService
    ) { }

    @Get('')
    async listDeliverers(
        @Body() dto: ProductDelivererDTO,
    ): Promise<DelivererViewmodel[]> {
        return this.svc.listDeliverers(dto)
    }

}
