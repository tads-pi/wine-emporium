import { Sequelize } from "sequelize"
import config from "../config/config.js"

const dbName = config.DB_NAME
const dbUser = config.DB_USER
const dbHost = config.DB_HOST
const dbPassword = config.DB_PASS

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    host: dbHost
})

export default sequelize
