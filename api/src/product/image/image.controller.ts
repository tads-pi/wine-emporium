import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('product/image')
@Controller('product/image')
@UseGuards(JwtGuard)
export class ImageController {
    constructor(
        private svc: ImageService
    ) { }

    @Post(':id')
    async uploadProductImage(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.uploadProductImage(id);
    }

    @Delete(':id')
    async deleteProductImage(
        @Param('id') id: string,
    ): Promise<null> {
        return this.svc.deleteProductImage(id);
    }

    @Post(':id/mark/:imageId')
    async markProductImage(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
    ): Promise<null> {
        return this.svc.markProductImage(id, imageId);
    }
}
