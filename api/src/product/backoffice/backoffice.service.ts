import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductBackofficeViewmodel } from '../viewmodels';
import { SaveProductDTO, UpdateProductStockDTO } from '../dto';
import { S3Service } from '../../aws/s3/s3.service';
import { ProductImageViewmodel } from '../image/viewmodel/product-image.viewmodel';
import { Product } from '@prisma/client';

@Injectable()
export class BackofficeService {
    constructor(
        private db: PrismaService,
        private s3: S3Service,
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

    async getAllProducts(page: number, limit: number, filters: string): Promise<ProductBackofficeViewmodel[]> {
        if (page == null) {
            page = 1;
        }

        if (limit == null) {
            limit = 10;
        }

        const whereClause = {}
        if (filters !== '') {
            const allFilters = filters.split(',')
            for (const f of allFilters) {
                const parsedFilter = f.split(':')
                whereClause[parsedFilter[0]] = {
                    contains: parsedFilter[1],
                }
            }
        }

        const products = await this.db.product.findMany({
            skip: Number((page - 1) * limit),
            take: Number(limit),
            orderBy: {
                // TODO opção de sorting de user
                id: 'desc',
            },
            where: whereClause
        });

        const viewmodel: ProductBackofficeViewmodel[] = []
        for (const product of products) {
            const productStock = await this.db.productStock.findMany({
                where: {
                    productId: product.id,
                },
            })

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
                active: product.active,
                images: productImagesViewmodel,
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
            active: product.active,
            stock: stock,
            images: productImagesViewmodel,
        }
    }

    async saveProduct(dto: SaveProductDTO): Promise<ProductBackofficeViewmodel> {
        const product = await this.db.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                ratings: dto.ratings,
                markedImageID: "",
                active: true,
            },
        });

        const productStock = await this.db.productStock.create({
            data: {
                total: 0,
                productId: product.id,
                unit: "UNIDADE",
            },
        })

        const viewmodel: ProductBackofficeViewmodel = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ratings: product.ratings,
            active: product.active,
            images: [],
            stock: [productStock],
        }

        return viewmodel
    }

    async updateProduct(id: string, dto: SaveProductDTO): Promise<ProductBackofficeViewmodel> {
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

        return await this.getProductById(id);
    }

    async updateProductStock(id: string, dto: UpdateProductStockDTO): Promise<ProductBackofficeViewmodel> {
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

        return await this.getProductById(id);
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

        return null
    }

}
