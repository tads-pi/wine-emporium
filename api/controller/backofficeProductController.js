import authService, { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_DATA, LIST_PRODUCT, SAVE_PRODUCT_IMAGE, TOGGLE_PRODUCT_ACTIVE, UPDATE_PRODUCT, VIEW_PRODUCT_EXTENDED_DATA } from "../service/authService.js"
import productService from "../service/productService.js"
import { getBase64ImageParams } from "../utils/image/index.js";
import { saveBufferedImage } from "../libs/aws/s3/index.js";
import { v4 as uuid } from "uuid";

// TODO LIDAR COM ERROS DENTRO DA APLICACAO E NAO RETORNAR PRO FRONT
// TODO adicionar filter & sort ex: price:greaterThan:9.99 sort:price:desc


const getTotalProducts = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, LIST_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para listar produtos"
        })
        return
    }

    const count = await productService.getTotalProducts()
    res.status(200).json({
        total: count
    })
}

/**
 * retorna todos os produtos do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllProducts = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, LIST_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para listar produtos"
        })
        return
    }

    await productService.getAllProducts(req, res)
}

/**
 * retorna um produto do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, GET_PRODUCT_DATA)) {
        res.status(403).json({
            message: "Usuário não tem permissão para ver um produto"
        })
        return
    }
    const extendedData = authService.userCan(req.context.user, VIEW_PRODUCT_EXTENDED_DATA)

    const product = await productService.getProduct(req, extendedData)
    if (!product) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    res.status(200).json({
        product: product.viewmodel(extendedData)
    })
}

/**
 * salva um produto no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const saveProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, CREATE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para criar produtos"
        })
        return
    }

    await productService.saveProduct(req, res)
}

/**
 * atualiza um produto no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, UPDATE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para atualizar um produto"
        })
        return
    }

    const fieldsToUpdate = req?.body || {}
    let allowedToUpdate = authService.getUserPermissionValue(req.context.user, UPDATE_PRODUCT)
    if (!allowedToUpdate) {
        res.status(403).json({
            message: "Usuário não tem permissão para atualizar um produto"
        })
        return
    }

    const invalidFields = Object.keys(fieldsToUpdate).filter(field => !allowedToUpdate.includes(field))

    if (invalidFields.length > 0) {
        res.status(403).json({
            message: `Usuário não tem permissão para atualizar os campos: ${invalidFields.join(", ")}`
        })
        return
    }

    await productService.updateProduct(req, res)

    res.status(200).json()
}

/**
 * ativa um produto no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const toggleProductActive = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, TOGGLE_PRODUCT_ACTIVE)) {
        res.status(403).json({
            message: "Usuário não tem permissão para ativar ou desativar um produto"
        })
        return
    }

    await productService.toggleProductActive(req, res)
}

/**
 * desativa um produto no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.context.user, DELETE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para deletar um produto"
        })
        return
    }

    await productService.deleteProduct(req, res)
}

/**
 * salva uma imagem de um produto no banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const uploadProductImage = async (req, res) => {
    // validates permission
    if (
        !authService.userCan(req.context.user, SAVE_PRODUCT_IMAGE) ||
        !authService.userCan(req.context.user, GET_PRODUCT_DATA)
    ) {
        res.status(403).json({
            message: "Usuário não tem permissão para salvar imagem de um produto"
        })
        return
    }

    // save image
    const product = await productService.getProduct(req, true)
    if (!product) {
        res.status(400).json({
            message: "Produto não encontrado"
        })
        return
    }

    // salva imagem localmente/
    const imageBase64 = req?.body?.imageBinary ?? ""
    if (imageBase64 === "") {
        res.status(400).json({
            message: "Campo 'imageBinary' não pode ser vazio"
        })
        return
    }

    const { mimeType, base64String } = getBase64ImageParams(imageBase64)
    if (!mimeType || !base64String) {
        res.status(400).json({
            message: "Payload de imagem inválido"
        })
        return
    }

    // eslint-disable-next-line no-undef
    const imageBuffer = Buffer.from(base64String, "base64")
    const response = await saveBufferedImage("wineemporium-uploads", imageBuffer, `products/${product.uuid}`, uuid(), mimeType)
    if (response.error) {
        res.status(400).json({
            message: "Erro ao salvar imagem: " + response.error
        })
        return
    }

    res.status(200).json({
        url: response.url
    })
}

const deleteProductImage = async (req, res) => {
    // validates permission
    if (
        !authService.userCan(req.context.user, SAVE_PRODUCT_IMAGE) ||
        !authService.userCan(req.context.user, GET_PRODUCT_DATA)
    ) {
        res.status(403).json({
            message: "Usuário não tem permissão para deletar imagem de um produto"
        })
        return
    }

    await productService.deleteProductImage(req, res)
}

const markProductImage = async (req, res) => {
    // validates permission
    if (
        !authService.userCan(req.context.user, SAVE_PRODUCT_IMAGE) ||
        !authService.userCan(req.context.user, GET_PRODUCT_DATA)
    ) {
        res.status(403).json({
            message: "Usuário não tem permissão para marcar imagem de um produto"
        })
        return
    }

    await productService.markProductImage(req, res)
}

const unmarkProductImage = async (req, res) => {
    // validates permission
    if (
        !authService.userCan(req.context.user, SAVE_PRODUCT_IMAGE) ||
        !authService.userCan(req.context.user, GET_PRODUCT_DATA)
    ) {
        res.status(403).json({
            message: "Usuário não tem permissão para desmarcar imagem de um produto"
        })
        return
    }

    await productService.unmarkProductImage(req, res)
}

export default {
    getTotalProducts,
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct,
    uploadProductImage,
    deleteProductImage,
    markProductImage,
    unmarkProductImage,
}
