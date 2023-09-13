import productRepository from "../repository/productRepository.js"
import { Product } from "../models/product.js"
import { getImagesFromFolder } from "../libs/aws/s3/index.js"

/**
 * @description Retorna uma lista de produtos
 * @param {*} req 
 * @returns Promise<Product[]>
 */
const getAllProducts = async (req) => {
    const filters = req.query.filters
    const sort = req.query.sort

    console.log("TODO - filters", filters);
    console.log("TODO - sort", sort);

    const findAllClause = {
        where: {
            deletedAt: null
        }
    }

    const data = await productRepository.productTable.findAll(findAllClause)
    if (data) {
        const products = data.map(({ dataValues }) => new Product(dataValues))
        // todo rodar asyncronamente depis resolver tudo
        for (const product of products) {
            product.images = await getImagesFromFolder("wineemporium-uploads", `products/${product.uuid}`)
        }
        return products
    }

    return null
}

/**
 * @description Retorna um produto
 * @param {*} req 
 * @returns Promise<Product>
 */
const getProduct = async (req) => {
    const productID = req?.params?.id || null
    if (!productID) {
        return
    }

    const data = await productRepository.productTable.findByPk(productID)
    if (!data) {
        return
    }

    const product = new Product(data.dataValues)
    product.images = await getImagesFromFolder("wineemporium-uploads", `products/${product.uuid}`)

    const findStockClause = {
        where: {
            product_id: productID
        }
    }
    const stock = await productRepository.productStockTable.findOne(findStockClause)
    product.stock = stock?.dataValues?.stock || 0

    return product
}

/**
 * TODO
 * @returns
 */
const saveProduct = async (req, res) => {
    const product = new Product(req.body)
    if (!product) {
        return
    }
    const validationErrors = product.validate()
    if (validationErrors) {
        res.status(400).json({
            message: `Campos inválidos: ${validationErrors.join(",")}`
        })
        return
    }

    const result = await productRepository.productTable.create(req.body)
    const productID = result?.dataValues?.id || null
    if (!productID) {
        res.status(500).json({
            message: "Erro interno ao salvar produto"
        })
        return
    }

    return productID
}

/**
 * @description Atualiza um produto
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateProduct = async (req, res) => {
    try {
        const productID = req?.params?.id || null
        if (!productID) {
            res.status(400).json({
                message: "ID de produto inválido"
            })
            return
        }

        const data = await productRepository.productTable.findByPk(productID)
        if (!data) {
            res.status(404).json({
                message: "Produto não encontrado"
            })
            return
        }

        const fieldsToUpdate = req?.body || {}
        const updateClause = {
            where: {
                id: productID
            }
        }

        await productRepository.productTable.update(fieldsToUpdate, updateClause)

        const shouldUpdateStock = fieldsToUpdate?.stock !== undefined
        if (shouldUpdateStock) {
            const data = await productRepository.productStockTable.findByPk(productID)
            if (!data) {
                console.log("ERROR PRODUCT STOCK NOT FOUND");
                res.status(404).json({
                    message: "Produto não encontrado"
                })
                return
            }

            const stock = data?.dataValues || {}
            const stockUpdateClause = {
                where: {
                    product_id: productID
                }
            }
            await productRepository.productStockTable.update(stock, stockUpdateClause)
        }

        return
    } catch (error) {
        console.error("updateProduct: ", error?.message || error);
        res.status(500).json()
        return
    }
}

/**
 * TODO
 * @returns
 */
const deactivateProduct = async (req, res) => {
    const productID = req?.params?.id || null
    if (!productID) {
        res.status(400).json({
            message: "ID de produto inválido"
        })
        return
    }

    const data = await productRepository.productTable.findByPk(productID)
    if (!data) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    const product = new Product(data.dataValues)
    product.active = !product.active

    const updateClause = {
        where: {
            id: productID
        }
    }

    // todo validate response here
    await productRepository.productTable.update(product, updateClause)

    return `Produto ${product.active ? "ativado" : "desativado"} com sucesso`
}

/**
 * TODO
 * @returns
 */
const deleteProduct = async (req, res) => {
    const productID = req?.params?.id || null
    if (!productID) {
        res.status(400).json({
            message: "ID de produto inválido"
        })
        return
    }

    const data = await productRepository.productTable.findByPk(productID)
    if (!data) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    const product = new Product(data.dataValues)
    product.deletedAt = new Date()

    const updateClause = {
        where: {
            id: productID
        }
    }

    // todo validate response here
    await productRepository.productTable.update(product, updateClause)

    return
}

/**
 * @description Retorna uma lista de imagens de um produto
 * @param {*} req 
 * @returns promise<string[]>
 */
const getProductImages = async (req) => {
    const productID = req?.params?.id || null
    if (!productID) {
        return
    }

    const product = await getProduct(req)
    if (!product) {
        return
    }

    return await getImagesFromFolder("wineemporium-uploads", `products/${product.uuid}`)
}

export default {
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deactivateProduct,
    deleteProduct,
    getProductImages
}