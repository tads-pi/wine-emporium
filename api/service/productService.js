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

    const products = await productRepository.productTable.findAll(findAllClause)
    return products
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

        res.status(200).json()
    } catch (error) {
        console.error("updateProduct: ", error?.message || error);
        res.status(500).json()
    }
}

/**
 * TODO
 * @returns
 */
const deactivateProduct = async (req) => {
    console.log(req.body);
    return "todo"
}

/**
 * TODO
 * @returns
 */
const deleteProduct = async (req) => {
    console.log(req.body);
    return "todo"
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