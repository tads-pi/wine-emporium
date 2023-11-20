import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductClientViewmodel } from '../viewmodels/client-product.viewmodel';

@ApiTags('product/store')
@Controller('product')
export class ClientController {
    constructor(
        private svc: ClientService
    ) { }

    @Get('store/total')
    async getTotalProducts(): Promise<number> {
        return this.svc.getTotalProducts();
    }

    @Get('store')
    async getAllProducts(
        @Query('page') page: number | null,
        @Query('limit') limit: number | null,
        @Headers() headers: any,
    ): Promise<ProductClientViewmodel[]> {
        return this.svc.getAllProducts(page, limit, headers);
    }

    @Get('store/:id')
    async getProductById(
        @Param('id') id: string,
    ): Promise<ProductClientViewmodel> {
        return this.svc.getProductById(id);
    }

    @Get('categories')
    async listCategories(): Promise<string[]> {
        return this.svc.listCategories();
    }
}
