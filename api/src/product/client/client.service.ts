import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductClientViewmodel, ProductTotalityViewmodel } from '../viewmodels/client-product.viewmodel';
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
            const validQueries: string[] = ["VINHOS", "UTILITARIOS", "OUTROS"]
            const categoryNotContainsSQLInjection = categorySearch.length <= 16 && !categorySearch.includes(";")
            const categoryExists = validQueries.includes(categorySearch)

            const isValidCategory = categoryNotContainsSQLInjection && categoryExists
            if (isValidCategory) {
                whereClause['category'] = {
                    equals: categorySearch,
                }
            }
        }

        const ratingsFrom = headers["ratings-from"]
        if (ratingsFrom) {
            const motContainsSQLInjection = ratingsFrom.length <= 16 && !ratingsFrom.includes(";")
            const isNumber = Number(ratingsFrom) != undefined

            const isValid = motContainsSQLInjection && isNumber
            if (isValid) {
                whereClause['ratings'] = {
                    gte: Number(ratingsFrom)
                }
            }
        }

        const ratingsTo = headers["ratings-to"]
        if (ratingsTo) {
            const motContainsSQLInjection = ratingsTo.length <= 16 && !ratingsTo.includes(";")
            const isNumber = Number(ratingsTo) != undefined

            const isValid = motContainsSQLInjection && isNumber
            if (isValid) {
                whereClause['ratings'] = {
                    ...whereClause['ratings'],
                    lte: Number(ratingsTo)
                }
            }
        }

        const priceFrom = headers['price-from']
        if (priceFrom) {
            const motContainsSQLInjection = priceFrom.length <= 16 && !priceFrom.includes(";")
            const isNumber = Number(priceFrom) != undefined

            const isValid = motContainsSQLInjection && isNumber
            if (isValid) {
                whereClause['price'] = {
                    gte: Number(priceFrom)
                }
            }
        }

        const priceTo = headers['price-to']
        if (priceTo) {
            const motContainsSQLInjection = priceTo.length <= 16 && !priceTo.includes(";")
            const isNumber = Number(priceTo) != undefined

            const isValid = motContainsSQLInjection && isNumber
            if (isValid) {
                whereClause['price'] = {
                    ...whereClause['price'],
                    lte: Number(priceTo)
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

    async getTotalProducts(): Promise<ProductTotalityViewmodel> {
        const total = await this.db.product.count({ where: { active: true } });
        const mostCheap = await this.db.product.findFirst({ orderBy: { price: 'asc', }, where: { active: true } });
        const mostExpensive = await this.db.product.findFirst({ orderBy: { price: 'desc', }, where: { active: true } });
        return {
            total: total,
            mostCheap: mostCheap.price,
            mostExpensive: mostExpensive.price,
        }
    }

    async getAllProducts(page: number, limit: number, headers: any): Promise<ProductClientViewmodel[]> {
        if (page == null) {
            page = 1;
        }

        if (limit == null) {
            limit = 10;
        }

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
                category: product.category,
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
            category: product.category,
        }
    }

    async listCategories(): Promise<string[]> {
        return [
            "VINHOS",
            "UTILITARIOS",
            "OUTROS",
        ]
    }
}
