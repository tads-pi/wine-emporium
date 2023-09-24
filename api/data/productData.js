import { Product } from "../entity/product.js";
import productStockTable from "../sequelize/tables/productStockTable.js";
import productTable from "../sequelize/tables/productTable.js";

const count = async countClause => await productTable.count(countClause)

const getAll = async (limit, offset) => {
    let raw = await productTable.findAll({
        where: {
            deletedAt: null,
        },
        limit: Number(limit),
        offset: Number(offset)
    })

    const products = raw.map(({ dataValues }) => new Product(dataValues))
    if (products.length === 0) return null

    for (const product of products) {
        // todo fazer outras camadas de data pra evitar ess gambiarra :(
        let stock = 0
        const rawStock = (
            await productStockTable.findOne({ where: { product_id: product.id } })
        )
        const noStockFound = rawStock === null || rawStock === undefined
        if (noStockFound) {
            await productStockTable.create({
                product_id: product.id,
                stock: 0,
                unit: "UN"
            })
        } else {
            stock = rawStock?.dataValues?.stock || 0
        }

        product.stock = stock
    }

    return products
}

const get = async (id) => {
    const { dataValues } = await productTable.findOne({
        where: {
            id,
            deletedAt: null
        }
    })
    return dataValues
}

const save = async (product) => {
    return await productTable.create(product)
}

const update = async (product, updateClause) => await productTable.update(product, updateClause)

const toggleActive = async (id, active) => {
    const next = {
        active
    }

    await productTable.update(next, {
        where: {
            id
        }
    })
    return true
}

const remove = async (id) => {
    const next = {
        deletedAt: new Date()
    }

    await productTable.update(next, {
        where: {
            id
        }
    })
    return true
}

export default {
    count,
    getAll,
    get,
    save,
    update,
    toggleActive,
    remove
}