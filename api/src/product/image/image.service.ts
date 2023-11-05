import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadProductImageDto } from './dto';
import { S3Service } from 'src/aws/s3/s3.service';
import { v4 as uuid } from "uuid";

@Injectable()
export class ImageService {
    constructor(
        private db: PrismaService,
        private s3: S3Service,
    ) { }

    private getBase64ImageParams(base64: string) {
        const base64Parts = base64.split(";base64,")
        const mimeType = base64Parts[0].replace("data:", "").trim()
        const base64String = base64Parts[1]

        return {
            mimeType,
            base64String
        }
    }

    async uploadProductImage(id: string, dto: UploadProductImageDto): Promise<null> {
        const product = await this.db.product.findUnique({ where: { id } })
        if (!product) {
            throw new NotFoundException("Produto não encontrado")
        }

        const { mimeType, base64String } = this.getBase64ImageParams(dto.imageBinary)
        if (!mimeType || !base64String) {
            throw new BadRequestException("Payload de imagem inválido")
        }

        const imageBuffer = Buffer.from(base64String, "base64")
        await this.s3.saveBufferedImage(imageBuffer, `products/${product.id}`, uuid(), mimeType)

        return null;
    }

    async deleteProductImage(id: string, imageId: string): Promise<null> {
        await this.s3.removeImageFromFolder(`products/${id}`, imageId)
        return null;
    }

    async markProductImage(id: string, imageId: string): Promise<null> {
        const product = await this.db.product.findUnique({ where: { id } })
        if (!product) {
            throw new NotFoundException("Produto não encontrado")
        }

        await this.db.product.update({
            where: { id },
            data: { markedImageID: imageId }
        })

        return null;
    }
}
