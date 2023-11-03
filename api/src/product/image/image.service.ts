import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
    constructor(
        private db: PrismaService
    ) { }

    async uploadProductImage(id: string): Promise<null> {
        console.log("TODO uploadProductImage");
        return null;
    }

    async deleteProductImage(id: string): Promise<null> {
        console.log("TODO deleteProductImage");
        return null;
    }

    async markProductImage(id: string, imageId: string): Promise<null> {
        console.log("TODO markProductImage");
        return null;
    }
}
