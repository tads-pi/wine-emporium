import { Product } from "../entity/product.js"
import { getImagesFromFolder } from "../libs/aws/s3/index.js"
import productTable from "../sequelize/tables/productTable.js"
import authService, { VIEW_PRODUCT_EXTENDED_DATA } from "./authService.js"

const getTotalProducts = async () => {
    const countClause = {
        where: {
            deletedAt: null
        }
    }
    const count = await productTable.count(countClause)
    return count
}

const getAllProducts = async (req, res) => {
    // validates user data
    const page = req.query?.page ?? 1
    const limit = req.query?.limit ?? 10
    const offset = Number(limit) * (Number(page) - 1)
    // TODO
    // const filterRequest = req.query?.filters || ""

    const findAllClause = {
        where: {
            deletedAt: null,
        },
        limit: Number(limit),
        offset: Number(offset)
    }

    const products = await productTable.findAll(findAllClause)
    if (!products || products.length === 0) {
        res.status(404).json({
            message: "Nenhum produto encontrado"
        })
        return
    }

    const parsedProducts = products.map(({ dataValues }) => new Product(dataValues))
    for (const product of parsedProducts) {
        // Images
        let images = await getImagesFromFolder("wineemporium-uploads", `products/${product?.uuid}`)
        if (images.length == 0) {
            images = await getImagesFromFolder("wineemporium-uploads", "products/fallback.png")
        }
        product.images = images
    }

    const extendedData = authService.userCan(req?.context?.user || {}, VIEW_PRODUCT_EXTENDED_DATA)
    res.status(200).json({
        products: parsedProducts.map(product => product.viewmodel(extendedData))
    })
}

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

    return product
}

const saveProduct = async (req, res) => {
    try {
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

        const result = await productTable.create(product.parseToSave())
        const productID = result?.dataValues?.id || null
        if (!productID) {
            res.status(500).json()
            return
        }

        res.status(200).json({
            id: productID
        })
    } catch (error) {
        console.error("error at saveProduct: ", error?.message || error);
        res.status(500).json()
    }
}

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
    } catch (error) {
        console.error("error at updateProduct: ", error?.message || error);
        res.status(500).json()
    }
}

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