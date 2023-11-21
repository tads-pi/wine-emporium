import { Global, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartViewmodel, CartViewmodelProduct } from './viewmodel';
import { Cart } from '@prisma/client';
import { S3Service } from '../aws/s3/s3.service';
import { ProductImageViewmodel } from '../product/image/viewmodel/product-image.viewmodel';

@Global()
@Injectable()
export class CartService {
    constructor(
        private db: PrismaService,
        private s3: S3Service,
    ) { }

    // Essa fn precisa ser public pra usarmos no controller de checkout
    public async calculateCartPrice(cartId: string): Promise<number> {
        const cartItems = await this.db.cartItems.findMany({ where: { cartId: cartId } })
        const products = await this.db.product.findMany({ where: { id: { in: cartItems.map(item => item.productId) } } })
        const total = products.reduce((previousResult, product) => {
            const item = cartItems.find(item => item.productId === product.id)
            return previousResult + (product.price * item.amount)
        }, 0)

        return Number(total.toFixed(2))
    }

    async getProductsFromCart(cart: Cart): Promise<CartViewmodelProduct[]> {
        const cartItems = await this.db.cartItems.findMany({ where: { cartId: cart.id } })
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
                category: p.category,
            })
        }

        return viewmodel
    }

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
                products: [],
                price: 0,
            }
        }

        return {
            id: cart.id,
            products: await this.getProductsFromCart(cart),
            price: await this.calculateCartPrice(cart.id),
        }
    }

    async addProduct(clientId: string, productId: string): Promise<CartViewmodel> {
        const cart = await this.db.cart.findFirst({ where: { clientId, status: 'OPEN' } })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        const productInCart = await this.db.cartItems.findFirst({
            where: { productId: productId, cartId: cart.id }
        })
        if (productInCart) {
            await this.db.cartItems.updateMany({
                where: {
                    cartId: cart.id,
                    productId: productId,
                },
                data: {
                    amount: productInCart.amount + 1,
                }
            })
        } else {
            await this.db.cartItems.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    amount: 1,
                }
            })
        }

        return await this.getOpenCart(clientId)
    }

    async removeProduct(clientId: string, productId: string): Promise<CartViewmodel> {
        const cart = await this.db.cart.findFirst({ where: { clientId, status: 'OPEN' } })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        const productInCart = await this.db.cartItems.findFirst({
            where: { productId: productId, cartId: cart.id }
        })
        if (productInCart) {
            if (productInCart.amount <= 1) {
                await this.db.cartItems.deleteMany({
                    where: {
                        cartId: cart.id,
                        productId: productId,
                    }
                })
            } else {
                await this.db.cartItems.updateMany({
                    where: {
                        cartId: cart.id,
                        productId: productId,
                    },
                    data: {
                        amount: productInCart.amount - 1,
                    }
                })
            }
        }

        return await this.getOpenCart(clientId)
    }

    async getCartPrice(clientId: string): Promise<number> {
        const cart = await this.db.cart.findFirst({ where: { clientId, status: 'OPEN' } })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        return this.calculateCartPrice(cart.id)
    }
}
