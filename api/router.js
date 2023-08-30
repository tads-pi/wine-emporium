import express from "express"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
// mysql
import db from "./connections/mysql.js"
// Controllers
import * as authController from "./controller/authController.js"
import * as backofficeController from "./controller/backofficeController.js"
db.sync(() => console.log(`successfully connected to ${process.env.DB_NAME} db`))

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

export const router = express.Router()
// public routes
// TODO esconder essa rota de documentacao
router.use("/docs", swaggerUi.serve, swaggerUi.setup(loadJSON("swagger.json")))
router.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})
router.post("/backoffice/auth", authController.handleBackofficeLogin)

// autheticated routes
router.post("/backoffice/user/save", authController.authenticateToken, backofficeController.saveBackofficeUser)
router.get("/backoffice/user", authController.authenticateToken, backofficeController.getAllBackofficeUsers)
router.get("/backoffice/user/:id", authController.authenticateToken, backofficeController.getBackofficeUser)
router.put("/backoffice/user/:id", authController.authenticateToken, backofficeController.updateBackofficeUser)
router.delete("/backoffice/user/:id/toggle-active", authController.authenticateToken, backofficeController.deactivateBackofficeUser)
router.delete("/backoffice/user/:id", authController.authenticateToken, backofficeController.deleteBackofficeUser)
