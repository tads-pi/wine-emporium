import productService from "../service/productService.js"

/**
 * retorna todos os produtos do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllProducts = async (req, res) => {
    await productService.getAllProducts(req, res)
}

/**
 * retorna um produto do banco de dados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getProduct = async (req, res) => {
    const product = await productService.getProduct(req, false)
    if (!product) {
        res.status(404).json({
            message: "Produto não encontrado"
        })
        return
    }

    const extendedData = false
    res.status(200).json({
        product: product.viewmodel(extendedData)
    })
}

export default {
    getAllProducts,
    getProduct,
}
