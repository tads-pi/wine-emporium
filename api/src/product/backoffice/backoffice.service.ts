import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductBackofficeViewmodel } from '../viewmodels';
import { SaveProductDTO, UpdateProductStockDTO } from '../dto';

@Injectable()
export class BackofficeService {
    constructor(
        private db: PrismaService,
    ) { }

    async checkProductExists(id: string): Promise<boolean> {
        const product = await this.db.product.findUnique({
            where: {
                id: id,
            },
        });
        return !!product;
    }

    async getTotalProducts(): Promise<number> {
        const total = await this.db.product.count();
        return total;
    }

    async getAllProducts(page: number, limit: number): Promise<ProductBackofficeViewmodel[]> {
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
        });

        const viewmodel: ProductBackofficeViewmodel[] = []
        for (const product of products) {
            const productStock = await this.db.productStock.findMany({
                where: {
                    productId: product.id,
                },
            })

            viewmodel.push({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                ratings: product.ratings,
                active: product.active,
                // TODO images
                images: [],
                stock: productStock,
            })
        }

        return viewmodel;
    }

    async getProductById(id: string): Promise<ProductBackofficeViewmodel> {
        const product = await this.db.product.findUnique({
            where: {
                id: id,
            },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const stock = await this.db.productStock.findMany({
            where: {
                productId: id,
            },
        })

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ratings: product.ratings,
            active: product.active,
            stock: stock,
            images: [],
        }
    }

    async saveProduct(dto: SaveProductDTO): Promise<null> {
        const product = await this.db.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                ratings: dto.ratings,
                active: true,
            },
        });

        await this.db.productStock.create({
            data: {
                total: 0,
                productId: product.id,
                unit: "UNIDADE",
            },
        })

        return
    }

    async updateProduct(id: string, dto: SaveProductDTO): Promise<null> {
        if (!await this.checkProductExists(id)) {
            throw new NotFoundException('Product not found');
        }

        // TODO check permissions before update
        // TODO make new guard for this
        await this.db.product.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                ratings: dto.ratings,
            },
        });

        return
    }

    async updateProductStock(id: string, dto: UpdateProductStockDTO): Promise<null> {
        // TODO check permissions before update
        // TODO make new guard for this
        if (!await this.checkProductExists(id)) {
            throw new NotFoundException('Product not found');
        }

        await this.db.productStock.update({
            where: {
                id: dto.stock_id,
                productId: id,
            },
            data: {
                total: dto.total,
            },
        })

        return
    }

    async toggleProductActive(id: string): Promise<null> {
        // TODO check permissions before update
        // TODO make new guard for this
        const product = await this.db.product.findUnique({
            where: {
                id: id,
            },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        await this.db.product.update({
            where: {
                id: id,
            },
            data: {
                active: !product.active,
            },
        });

        return
    }

}
