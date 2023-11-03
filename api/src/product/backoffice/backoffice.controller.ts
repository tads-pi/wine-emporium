import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BackofficeService } from './backoffice.service';
import { JwtGuard } from 'src/auth/guard';
import { SaveProductDTO, UpdateProductStockDTO } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductBackofficeViewmodel } from '../viewmodels';

@ApiTags('product/backoffice')
@Controller('product/backoffice')
@UseGuards(JwtGuard)
export class BackofficeController {
    constructor(
        private svc: BackofficeService
    ) { }

    @Get('total')
    async getTotalProducts(): Promise<number> {
        return this.svc.getTotalProducts();
    }

    @Get('')
    async getAllProducts(
        @Query('page') page: number | null,
        @Query('limit') limit: number | null,
    ): Promise<ProductBackofficeViewmodel[]> {
        return this.svc.getAllProducts(page, limit);
    }

    @Get(':id')
    async getProductById(
        @Param('id') id: string,
    ): Promise<ProductBackofficeViewmodel> {
        return this.svc.getProductById(id);
    }

    @Post('')
    async saveProduct(
        @Body() dto: SaveProductDTO,
    ): Promise<null> {
        return this.svc.saveProduct(dto);
    }

    @Post(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() dto: SaveProductDTO,
    ): Promise<null> {
        return this.svc.updateProduct(id, dto);
    }

    @Put('stock/:id')
    async updateProductStock(
        @Param('id') id: string,
        @Body() dto: UpdateProductStockDTO,
    ): Promise<null> {
        return this.svc.updateProductStock(id, dto);
    }

    @Delete(':id')
    async toggleProductActive(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.toggleProductActive(id);
    }
}