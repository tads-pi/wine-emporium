import { Product } from "../entity/product.js"
import { getImagesFromFolder } from "../libs/aws/s3/index.js"
import productStockTable from "../sequelize/tables/productStockTable.js"
import productRatingsTable from "../sequelize/tables/productRatingTable.js"
import productTable from "../sequelize/tables/productTable.js"
import authService, { VIEW_PRODUCT_EXTENDED_DATA } from "./authService.js"

const getTotalProducts = async () => {
    const countClause = {
        where: {
            deletedAt: null
        }
    }
    const count = await productData.count(countClause)
    return count
}

/**
 * @description Retorna uma lista de produtos
 * @param {*} req 
 * @returns Promise<Product[]>
 */
const getAllProducts = async (req, res) => {
    // validates user data
    const page = req.query?.page ?? 1
    const limit = req.query?.limit ?? 10
    const offset = Number(limit) * (Number(page) - 1)
    // TODO
    // const filterRequest = req.query?.filters || ""

    const products = await productData.getAll(limit, offset)
    if (!products) {
        res.status(404).json({
            message: "Nenhum produto encontrado"
        })
        return
    }

    const extendedData = authService.userCan(req.context.user, VIEW_PRODUCT_EXTENDED_DATA)
    res.status(200).json({
        products: products.map(product => product.viewmodel(extendedData))
    })
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

    const data = await productTable.findByPk(productID)
    if (!data) {
        return
    }

    const product = new Product(data.dataValues)

    // Add Images
    product.images = await getImagesFromFolder("wineemporium-uploads", `products/${product.uuid}`)

    // Add Stock
    const findStockClause = {
        where: {
            product_id: productID
        }
    }
    const stock = await productStockTable.findOne(findStockClause)
    product.stock = stock?.dataValues?.stock || 0

    // Add Ratings
    const ratings = await productRatingsTable.findAll({
        where: {
            product_id: productID
        },
        group: ["product_id"],
        attributes: [
            "product_id",
            [productRatingsTable.sequelize.fn("AVG", productRatingsTable.sequelize.col("value")), "average_rating"],
            [productRatingsTable.sequelize.fn("COUNT", productRatingsTable.sequelize.col("value")), "total_ratings"]
        ]
    })
    if (ratings) {
        if (ratings.length > 0) {
            // we need to inform [0] because we're grouping by product_id, so it will always return an array with 1 element
            product.ratings = Number(ratings[0]?.dataValues?.average_rating) || 0
            product.totalRatings = Number(ratings[0]?.dataValues?.total_ratings) || 0
        }
    }

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
    if (validationErrors.length > 0) {
        res.status(400).json({
            message: `Campos inválidos: ${validationErrors.join(",")}`
        })
        return
    }

    const result = await productTable.create(product)
    const productID = result?.dataValues?.id || null
    if (!productID) {
        res.status(500).json({
            message: "Erro interno ao salvar produto"
        })
        return
    }

    res.status(200).json({
        id: productID
    })
    return
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

        const data = await productTable.findByPk(productID)
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

        await productTable.update(fieldsToUpdate, updateClause)

        const shouldUpdateStock = fieldsToUpdate?.stock !== undefined
        if (shouldUpdateStock) {
            const findStockClause = {
                where: {
                    product_id: productID
                }
            }

            let data = await productStockTable.findOne(findStockClause)
            if (!data) {
                data = await productStockTable.create({
                    product_id: productID,
                    stock: 1,
                    unit: "unidade",
                })
            }

            const stock = {
                stock: Number(fieldsToUpdate?.stock || 0)
            }
            const stockUpdateClause = {
                where: {
                    product_id: productID
                }
            }
            await productStockTable.update(stock, stockUpdateClause)
        }

        return
    } catch (error) {
        console.error("error at updateProduct: ", error?.message || error);
        res.status(500).json()
        return
    }
}

/**
 * TODO
 * @returns
 */
const toggleProductActive = async (req, res) => {
    const productID = req?.params?.id || null
    if (!productID) {
        res.status(400).json({
            message: "ID de produto inválido"
        })
        return
    }

    const data = await productTable.findByPk(productID)
    if (!data) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    const activeStatus = req?.body?.active || false
    const product = {
        active: activeStatus
    }

    const updateClause = {
        where: {
            id: productID
        }
    }

    await productTable.update(product, updateClause)

    res.status(200).json({
        message: `Produto ${product.active ? "ativado" : "desativado"} com sucesso`
    })
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

    const data = await productTable.findByPk(productID)
    if (!data) {
        // TODO arrumar cloudfront response aqui 
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
    await productTable.update(product, updateClause)

    res.status(200).json({
        message: "Produto deletado com sucesso"
    })
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
    getTotalProducts,
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct,
    getProductImages
}