import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

const backofficeRolePermissionTable = db.define("backoffice_role_permission", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default backofficeRolePermissionTable
