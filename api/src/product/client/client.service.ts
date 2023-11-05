import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductClientViewmodel } from '../viewmodels/client-product.viewmodel';

@Injectable()
export class ClientService {
    constructor(
        private db: PrismaService,
    ) { }

    async getTotalProducts(): Promise<number> {
        const total = await this.db.product.count({
            where: {
                active: true,
            }
        });
        return total;
    }

    async getAllProducts(page: number, limit: number): Promise<ProductClientViewmodel[]> {
        if (page == null) {
            page = 1;
        }

        if (limit == null) {
            limit = 10;
        }

        const products = await this.db.product.findMany({
            skip: Number((page - 1) * limit),
            take: Number(limit),
            orderBy: {
                // TODO opção de sorting de user
                id: 'desc',
            },
            where: {
                active: true,
            }
        });
        if (products.length === 0) {
            return [];
        }

        const viewmodel = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                ratings: product.ratings,
                // TODO
                images: [],
            }
        })

        return viewmodel;
    }

    async getProductById(id: string): Promise<ProductClientViewmodel> {
        const product = await this.db.product.findUnique({
            where: {
                id: id,
                active: true,
            },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ratings: product.ratings,
            // TODO
            images: [],
        }
    }
}
