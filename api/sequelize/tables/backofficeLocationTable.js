import { DataTypes, Sequelize } from "sequelize"
import db from "../connections/mysql.js"

/**
 * @description Define a estrutura da tabela backoffice_locarion
 */
export default db.define("backoffice_locations", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})