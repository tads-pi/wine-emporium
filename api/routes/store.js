import express from "express"
import productController from "../controller/productController.js"
import authController from "../controller/authController.js"
import userController from "../controller/userController.js"

export const storeRouter = express.Router()

// product
storeRouter.get("/product", productController.getAllProducts)
storeRouter.get("/product/:id", productController.getProduct)

// auth & register
storeRouter.post("/auth", authController.handleStoreLogin)
storeRouter.post("/register", userController.saveUser)

// user
storeRouter.use(authController.authenticateToken)
storeRouter.get("/user", userController.getUser)