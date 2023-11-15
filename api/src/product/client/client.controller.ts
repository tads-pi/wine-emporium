import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductClientViewmodel } from '../viewmodels/client-product.viewmodel';

@ApiTags('product/store')
@Controller('product/store')
export class ClientController {
    constructor(
        private svc: ClientService
    ) { }

    @Get('total')
    async getTotalProducts(): Promise<number> {
        return this.svc.getTotalProducts();
    }

    @Get('')
    async getAllProducts(
        @Query('page') page: number | null,
        @Query('limit') limit: number | null,
        @Query('filters') filters: string | null,
        @Query('sort') sort: string | null,
    ): Promise<ProductClientViewmodel[]> {
        return this.svc.getAllProducts(page, limit, filters, sort);
    }

    @Get(':id')
    async getProductById(
        @Param('id') id: string,
    ): Promise<ProductClientViewmodel> {
        return this.svc.getProductById(id);
    }
}
