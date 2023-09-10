import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

// todo migrate uuid from strings to uuid v4
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
})

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

// TODO when tables do not exists this queries crashes the app
productTable.hasMany(productRatingsTable, {
    foreignKey: "product_id",
    as: "ratings"
})

productRatingsTable.belongsTo(productTable, {
    foreignKey: "product_id",
    as: "product"
})

export default {
    productTable,
    productRatingsTable,
}