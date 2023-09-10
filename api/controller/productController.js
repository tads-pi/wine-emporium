import authService, { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT_DATA, LIST_PRODUCT, TOGGLE_PRODUCT_ACTIVE, UPDATE_PRODUCT, VIEW_PRODUCT_EXTENDED_DATA } from "../service/authService.js"
import productService from "../service/productService.js"

// TODO LIDAR COM ERROS DENTRO DA APLICACAO E NAO RETORNAR PRO FRONT
// TODO adicionar filter & sort ex: price:greaterThan:9.99 sort:price:desc

export const getAllProducts = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, LIST_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para listar produtos"
        })
        return
    }

    const products = await productService.getAllProducts(req)
    res.status(200).json({ products })
}

export const getProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, GET_PRODUCT_DATA)) {
        res.status(403).json({
            message: "Usuário não tem permissão para ver um produto"
        })
        return
    }
    const extendedData = authService.userCan(req.body.user_context, VIEW_PRODUCT_EXTENDED_DATA)

    const product = await productService.getProduct(req, extendedData)

    res.status(200).json({ product })
}

export const saveProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, CREATE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para criar produtos"
        })
        return
    }

    res.status(200).json({
        message: "todo"
    })
}

export const updateProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, UPDATE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para atualizar um produto"
        })
        return
    }

    res.status(200).json({
        message: "todo"
    })
}

export const deactivateProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, TOGGLE_PRODUCT_ACTIVE)) {
        res.status(403).json({
            message: "Usuário não tem permissão para desativar um produto"
        })
        return
    }

    res.status(200).json({
        message: "todo"
    })
}

export const deleteProduct = async (req, res) => {
    // validates permission
    if (!authService.userCan(req.body.user_context, DELETE_PRODUCT)) {
        res.status(403).json({
            message: "Usuário não tem permissão para deletar um produto"
        })
        return
    }

    res.status(200).json({
        message: "todo"
    })
}
