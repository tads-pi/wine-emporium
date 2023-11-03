import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { UploadProductImageDto } from './dto';

@ApiTags('product/image')
@Controller('product')
@UseGuards(JwtGuard)
export class ImageController {
    constructor(
        private svc: ImageService
    ) { }

    @Post(':id/image')
    async uploadProductImage(
        @Param('id') id: string,
        @Body() dto: UploadProductImageDto,
    ): Promise<null> {
        return this.svc.uploadProductImage(id, dto);
    }

    @Delete(':id/image/:imageId')
    async deleteProductImage(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
    ): Promise<null> {
        return this.svc.deleteProductImage(id, imageId);
    }

    @Post(':id/image/:imageId/mark')
    async markProductImage(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
    ): Promise<null> {
        return this.svc.markProductImage(id, imageId);
    }
}
