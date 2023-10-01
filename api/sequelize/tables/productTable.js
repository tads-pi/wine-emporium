import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

// todo migrate uuid from strings to uuid v4
/**
 * @description Define a estrutura da tabela products
 */
const productTable = db.define("products", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ratings: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
})

export default productTable
