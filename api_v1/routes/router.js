import express from "express"
// mysql
import db from "../sequelize/connections/mysql.js"
// routes
import { swaggerRouter } from "./swagger.js"
import { storeRouter } from "./store.js"
import { backofficeRouter } from "./backoffice.js"

const app = express()
try {
    // sync database
    await db.sync()
    // todo limit to 1mb and throw validation err
    // define limite para upload de imagens
    app.use(express.json({ limit: "10mb" }))
    // solve cors locally
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "*")
        next()
    })
    app.use("/health", express.Router().get("/", (req, res) => {
        res.status(200).json({
            message: "OK"
        })
    }))
    // routes
    app.use("/v1/docs", swaggerRouter)
    app.use("/v1/backoffice", backofficeRouter)
    app.use("/v1/store", storeRouter)
} catch (error) {
    console.log("error making routes: ", error)
}

export default app