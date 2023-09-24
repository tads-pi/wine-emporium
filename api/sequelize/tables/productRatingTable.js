import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

/**
 * @description Define a estrutura da tabela product_ratings
 */
const productRatingsTable = db.define("product_ratings", {
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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
})

export default productRatingsTable
