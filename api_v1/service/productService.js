import { Product } from "../entity/product.js"
import { getProductImages, removeImageFromFolder } from "../libs/aws/s3/index.js"
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
            active: true
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
        let images = await getProductImages("wineemporium-uploads", product)
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

const getProductByID = async (id) => {
    if (!id) {
        return
    }

    const data = await productTable.findByPk(id)
    if (!data) {
        return
    }

    const product = new Product(data.dataValues)

    // Add Images
    product.images = await getProductImages("wineemporium-uploads", product)

    return product
}

const getProduct = async (req) => {
    const productUUID = req?.params?.id || null
    if (!productUUID) {
        return
    }

    const findProductClause = {
        where: {
            uuid: productUUID,
            deletedAt: null
        }
    }

    const data = await productTable.findOne(findProductClause)
    if (!data) {
        return
    }

    const product = new Product(data.dataValues)
    if (!product) {
        return
    }

    // Add Images
    product.images = await getProductImages("wineemporium-uploads", product)

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

        const createdProduct = await getProductByID(productID)
        if (!createdProduct) {
            res.status(500).json()
            return
        }

        res.status(200).json({
            id: createdProduct.uuid,
        })
    } catch (error) {
        console.error("error at saveProduct: ", error?.message || error);
        res.status(500).json()
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await getProduct(req)
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado"
            })
            return
        }

        const fieldsToUpdate = req?.body || {}
        const updateClause = {
            where: {
                id: product.id
            }
        }

        await productTable.update(fieldsToUpdate, updateClause)
    } catch (error) {
        console.error("error at updateProduct: ", error?.message || error);
        res.status(500).json()
    }
}

const toggleProductActive = async (req, res) => {
    const product = await getProduct(req)
    if (!product) {
        res.status(400).json({
            message: "Produto não encontrado"
        })
        return
    }

    const activeStatus = req?.body?.active || false
    const newProduct = {
        active: activeStatus
    }

    const updateClause = {
        where: {
            id: product.id
        }
    }

    await productTable.update(newProduct, updateClause)
    res.status(200).json({
        message: `Produto ${product.active ? "ativado" : "desativado"} com sucesso`
    })
}

const deleteProduct = async (req, res) => {
    const product = await getProduct(req)
    if (!product) {
        res.status(400).json({
            message: "Produto não encontrado"
        })
        return
    }

    product.deletedAt = new Date()
    const updateClause = {
        where: {
            id: product.id
        }
    }

    // todo validate response here
    await productTable.update(product, updateClause)

    res.status(200).json({
        message: "Produto deletado com sucesso"
    })
}

const deleteProductImage = async (req, res) => {
    const product = await getProduct(req)
    if (!product) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    const imageUUIDWithExtension = req?.body?.imageID || null
    if (!imageUUIDWithExtension) {
        res.status(400).json({
            message: "ID de imagem inválido"
        })
        return
    }

    await removeImageFromFolder("wineemporium-uploads", `products/${product.uuid}`, imageUUIDWithExtension)
    res.status(200).json()
}

const markProductImage = async (req, res) => {
    try {
        const product = await getProduct(req)
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado"
            })
            return
        }

        const imageUUIDWithExtension = req?.body?.image_id || null
        if (!imageUUIDWithExtension) {
            res.status(400).json({
                message: "ID de imagem inválido"
            })
            return
        }

        const fieldsToUpdate = {
            marked_image_uuid: imageUUIDWithExtension
        }

        const updateClause = {
            where: {
                id: product.id
            }
        }

        await productTable.update(fieldsToUpdate, updateClause)

        res.status(200).json()
    } catch (error) {
        console.error("error at markProductImage: ", error?.message || error);
        res.status(500).json()
    }
}

export default {
    getTotalProducts,
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct,
    deleteProductImage,
    markProductImage,
}