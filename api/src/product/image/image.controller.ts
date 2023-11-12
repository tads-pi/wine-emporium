import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard';
import { UploadProductImageDto } from './dto';
import { BackofficeAdminGuard } from '../../auth/guard/backoffice.guard';

@ApiTags('product/image')
@Controller('product/:productId/image')
@UseGuards(JwtGuard, BackofficeAdminGuard)
export class ImageController {
    constructor(
        private svc: ImageService
    ) { }

    @Post('')
    async uploadProductImage(
        @Param('productId') productId: string,
        @Body() dto: UploadProductImageDto,
    ): Promise<null> {
        return this.svc.uploadProductImage(productId, dto);
    }

    @Delete(':imageId')
    async deleteProductImage(
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ): Promise<null> {
        return this.svc.deleteProductImage(productId, imageId);
    }

    @Post(':imageId/mark')
    async markProductImage(
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ): Promise<null> {
        return this.svc.markProductImage(productId, imageId);
    }
}
