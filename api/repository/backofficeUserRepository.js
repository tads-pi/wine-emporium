import { Sequelize } from "sequelize";
import db from "../connections/mysql.js";

export default db.define("backoffice_users", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    group: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});