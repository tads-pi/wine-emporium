import productRepository from "../repository/productRepository.js"
import { Product } from "../models/product.js"

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

const getProduct = async (req, viewExtendedData) => {
    const productID = req?.params?.id || null
    if (!productID) {
        return
    }

    const data = await productRepository.productTable.findByPk(productID)
    if (!data) {
        return
    }

    const product = new Product(data.dataValues)
    return product.viewmodel(viewExtendedData)
}

const saveProduct = async (req) => {
    console.log(req.body);
    return "todo - saveProduct"
}

const updateProduct = async (req) => {
    console.log(req.body);
    return "todo"
}

const deactivateProduct = async (req) => {
    console.log(req.body);
    return "todo"
}

const deleteProduct = async (req) => {
    console.log(req.body);
    return "todo"
}

export default {
    getAllProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deactivateProduct,
    deleteProduct
}