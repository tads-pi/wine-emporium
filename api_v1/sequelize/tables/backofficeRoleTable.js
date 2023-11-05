import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

const backofficeRoleTable = db.define("backoffice_role", {
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
})

export default backofficeRoleTable
