import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartViewmodel, CartViewmodelProduct } from './viewmodel';
import { Cart } from '@prisma/client';
import { S3Service } from 'src/aws/s3/s3.service';
import { ProductClientViewmodel } from 'src/product/viewmodels/client-product.viewmodel';
import { ProductImageViewmodel } from 'src/product/image/viewmodel/product-image.viewmodel';
import { UpdateCartDTO } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        private db: PrismaService,
        private s3: S3Service,
    ) { }

    async getOpenCart(clientId: string): Promise<CartViewmodel> {
        let cart: Cart

        cart = await this.db.cart.findFirst({
            where: {
                clientId,
                status: 'OPEN'
            },
        })
        if (!cart) {
            // Se o usuário não tem nenhum carrinho "em aberto"
            // devemos criar um novo!
            cart = await this.db.cart.create({
                data: {
                    clientId,
                    status: 'OPEN'
                }
            })

            return {
                id: cart.id,
                products: []
            }
        }

        const cartItems = await this.db.cartItems.findMany({ where: { cartId: cart.id } })
        const getProducts: () => Promise<CartViewmodelProduct[]> = async () => {
            const products = await this.db.product.findMany({ where: { id: { in: cartItems.map(item => item.productId) } } })

            const viewmodel: CartViewmodelProduct[] = []
            for (const p of products) {
                const images = await this.s3.getImagesFromFolder(`products/${p.id}`)
                const imageViewmodel: ProductImageViewmodel[] = images.map(i => {
                    return {
                        id: i.key,
                        url: i.url,
                        marked: i.key === p.markedImageID
                    }
                })

                viewmodel.push({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    ratings: p.ratings,
                    images: imageViewmodel,
                    amount: cartItems.find(item => item.productId === p.id).amount,
                })
            }

            return viewmodel
        }

        return {
            id: cart.id,
            products: await getProducts()
        }
    }

    async updateOpenCart(clientId: string, dto: UpdateCartDTO): Promise<CartViewmodel> {
        const cart = await this.db.cart.findFirst({ where: { clientId, status: 'OPEN' } })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        for (const product of dto.products) {
            if (product.amount <= 0) {
                await this.db.cartItems.deleteMany({
                    where: {
                        cartId: cart.id,
                        productId: product.id,
                    }
                })
                continue
            }

            // 
            const productInCart = await this.db.cartItems.findFirst({
                where: { productId: product.id, cartId: cart.id }
            })
            if (productInCart) {
                await this.db.cartItems.updateMany({
                    where: {
                        cartId: cart.id,
                        productId: product.id,
                    },
                    data: {
                        amount: product.amount
                    }
                })
            } else {
                await this.db.cartItems.create({
                    data: {
                        cartId: cart.id,
                        productId: product.id,
                        amount: product.amount,
                    }
                })
            }
        }

        return
    }

    async getCartPrice(clientId: string): Promise<number> {
        const cart = await this.db.cart.findFirst({ where: { clientId, status: 'OPEN' } })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        const cartItems = await this.db.cartItems.findMany({ where: { cartId: cart.id } })
        const products = await this.db.product.findMany({ where: { id: { in: cartItems.map(item => item.productId) } } })
        const total = products.reduce((previousResult, product) => {
            const item = cartItems.find(item => item.productId === product.id)
            return previousResult + (product.price * item.amount)
        }, 0)

        return total
    }
}
