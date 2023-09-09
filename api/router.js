import express from "express"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
// mysql
import db from "./connections/mysql.js"
// Controllers
import * as authController from "./controller/authController.js"
import * as backofficeController from "./controller/backofficeController.js"
// import * as productsController from "./controller/productsController.js"

db.sync(() => console.log("successfully connected to db"))

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

export const router = express.Router()

// TODO esconder essa rota de documentacao
router.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(loadJSON("swagger.json")))
router.get("/v1/health", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})
router.post("/v1/backoffice/auth", authController.handleBackofficeLogin)

// autheticated routes
router.post("/v1/backoffice/user", authController.authenticateToken, backofficeController.saveBackofficeUser)
router.get("/v1/backoffice/user", authController.authenticateToken, backofficeController.getAllBackofficeUsers)
router.get("/v1/backoffice/user/:id", authController.authenticateToken, backofficeController.getBackofficeUser)
router.put("/v1/backoffice/user/:id", authController.authenticateToken, backofficeController.updateBackofficeUser)
router.delete("/v1/backoffice/user/:id/toggle-active", authController.authenticateToken, backofficeController.deactivateBackofficeUser)
router.delete("/v1/backoffice/user/:id", authController.authenticateToken, backofficeController.deleteBackofficeUser)

// produtos
// router.get("/products", productsController.getAllProducts)