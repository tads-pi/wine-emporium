import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductClientViewmodel } from '../viewmodels/client-product.viewmodel';
import { S3Service } from '../../aws/s3/s3.service';
import { ProductImageViewmodel } from '../image/viewmodel/product-image.viewmodel';

@Injectable()
export class ClientService {
    constructor(
        private db: PrismaService,
        private s3: S3Service,
    ) { }

    async getTotalProducts(): Promise<number> {
        const total = await this.db.product.count({
            where: {
                active: true,
            }
        });
        return total;
    }

    async getAllProducts(page: number, limit: number, filters: string, sort: string): Promise<ProductClientViewmodel[]> {
        if (page == null) {
            page = 1;
        }

        if (limit == null) {
            limit = 10;
        }

        if (sort == null) {
            sort = 'id';
        }

        const whereClause = {
            active: true
        }
        if (filters && filters !== '') {
            const allFilters = filters.split(',')
            for (const f of allFilters) {
                const parsedFilter = f.split(':')
                whereClause[parsedFilter[0]] = {
                    contains: parsedFilter[1],
                }
            }
        }

        let orderByClause = {}
        const sortableFields = ['id', 'name', 'price', 'ratings']
        const sortableOrders = ['desc', 'asc']
        const [field, direction] = sort.split(':')
        if (
            sortableFields.includes(field) &&
            sortableOrders.includes(direction)
        ) {
            orderByClause = {
                [field]: direction,
            }
        }

        const products = await this.db.product.findMany({
            skip: Number((page - 1) * limit),
            take: Number(limit),
            orderBy: orderByClause,
            where: whereClause,
        });

        const viewmodel: ProductClientViewmodel[] = []
        for (const product of products) {
            const productImages = await this.s3.getImagesFromFolder(`products/${product.id}`)
            const productImagesViewmodel: ProductImageViewmodel[] = []

            for (const image of productImages) {
                productImagesViewmodel.push({
                    id: image.key,
                    url: image.url,
                    marked: image.key === product.markedImageID,
                })
            }

            viewmodel.push({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                ratings: product.ratings,
                images: productImagesViewmodel,
            })
        }

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

        const productImages = await this.s3.getImagesFromFolder(`products/${product.id}`)
        const productImagesViewmodel: ProductImageViewmodel[] = []

        for (const image of productImages) {
            productImagesViewmodel.push({
                id: image.key,
                url: image.url,
                marked: image.key === product.markedImageID,
            })
        }

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ratings: product.ratings,
            images: productImagesViewmodel,
        }
    }
}
