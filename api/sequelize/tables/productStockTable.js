import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

const productStockTable = db.define("product_stocks", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
})

export default productStockTable