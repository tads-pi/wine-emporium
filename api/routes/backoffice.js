import express from "express"
import authController from "../controller/authController.js"
import backofficeController from "../controller/backofficeController.js"
import backofficeProductController from "../controller/backofficeProductController.js"

export const backofficeRouter = express.Router()

// auth
backofficeRouter.post("/auth", authController.handleBackofficeLogin)

backofficeRouter.use(authController.authenticateToken)
// user
backofficeRouter.post("/user", backofficeController.saveBackofficeUser)
backofficeRouter.get("/user", backofficeController.getAllBackofficeUsers)
backofficeRouter.get("/user/:id", backofficeController.getBackofficeUser)
backofficeRouter.put("/user/:id", backofficeController.updateBackofficeUser)
backofficeRouter.post("/user/:id/toggle-active", backofficeController.deactivateBackofficeUser)
backofficeRouter.delete("/user/:id", backofficeController.deleteBackofficeUser)
// product
backofficeRouter.get("/product/total", backofficeProductController.getTotalProducts)
backofficeRouter.post("/product", backofficeProductController.saveProduct)
backofficeRouter.get("/product", backofficeProductController.getAllProducts)
backofficeRouter.get("/product/:id", backofficeProductController.getProduct)
backofficeRouter.put("/product/:id", backofficeProductController.updateProduct)
backofficeRouter.post("/product/:id/toggle-active", backofficeProductController.toggleProductActive)
backofficeRouter.delete("/product/:id", backofficeProductController.deleteProduct)
backofficeRouter.post("/product/:id/upload", backofficeProductController.uploadProductImage)