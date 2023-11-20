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

    private unmarshallWhereClause(headers: any): Object {
        const whereClause = {}
        const nameSearch = headers['name']
        if (nameSearch) {
            const nameNotContainsSQLInjection = nameSearch.length <= 16 && !nameSearch.includes(";")
            if (nameNotContainsSQLInjection) {
                whereClause['name'] = {
                    contains: nameSearch,
                }
            }
        }

        const categorySearch = headers['category']?.toUpperCase()
        if (categorySearch) {
            const validQueries: string[] = ["VINHOS", "UTILIDADES", "OUTROS"]
            const categoryNotContainsSQLInjection = categorySearch.length <= 16 && !categorySearch.includes(";")
            const categoryExists = validQueries.includes(categorySearch)

            const isValidCategory = categoryNotContainsSQLInjection && categoryExists
            if (isValidCategory) {
                whereClause['category'] = {
                    equals: categorySearch,
                }
            }
        }

        return whereClause
    }

    private unmarshallOrderByClause(headers: any): Object {
        const orderByClause = {}

        const sort = headers['sort']
        if (sort) {
            const [field, direction] = sort.split(':')

            const fieldNotContainsSQLInjection = field.length <= 16 && !field.includes(";")
            const fieldIsSortable = ['name', 'price', 'ratings'].includes(field)

            const isValidField = fieldNotContainsSQLInjection && fieldIsSortable
            const isValidDirection = direction === 'asc' || direction === 'desc'

            if (isValidField && isValidDirection) {
                orderByClause[field] = direction
            }
        }

        return orderByClause
    }

    async getTotalProducts(): Promise<number> {
        const total = await this.db.product.count({
            where: {
                active: true,
            }
        });
        return total;
    }

    async getAllProducts(page: number, limit: number, headers: any): Promise<ProductClientViewmodel[]> {
        if (page == null) {
            page = 1;
        }

        if (limit == null) {
            limit = 10;
        }

        // if (sort == null) {
        //     sort = 'id';
        // }

        // const whereClause = {
        //     active: true
        // }
        // if (filters && filters !== '') {
        //     const allFilters = filters.split(',')
        //     for (const f of allFilters) {
        //         const filterableFields: string[] = ['name', 'category']
        //         const [field, query] = f.split(':')

        //         if (!filterableFields.includes(field)) {
        //             continue
        //         }

        //         if (field === 'name') {
        //             whereClause[field] = {
        //                 contains: query,
        //             }
        //         } else {
        //             const validQueries: string[] = ["VINHOS", "UTILIDADES", "OUTROS"]

        //             if (!validQueries.includes(query)) {
        //                 continue
        //             }

        //             whereClause[field] = {
        //                 equals: query,
        //             }
        //         }
        //     }
        // }

        // let orderByClause = {}
        // const sortableFields = ['id', 'name', 'price', 'ratings', 'category']
        // const sortableOrders = ['desc', 'asc']
        // const [field, direction] = sort.split(':')
        // if (
        //     sortableFields.includes(field) &&
        //     sortableOrders.includes(direction)
        // ) {
        //     orderByClause = {
        //         [field]: direction,
        //     }
        // }

        const whereClause = this.unmarshallWhereClause(headers)
        const orderByClause = this.unmarshallOrderByClause(headers)

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

    async listCategories(): Promise<string[]> {
        return [
            "VINHOS",
            "UTILIDADES",
            "OUTROS",
        ]
    }
}
