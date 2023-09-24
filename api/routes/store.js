import express from "express"
import productController from "../controller/productController.js"

export const storeRouter = express.Router()

// product
storeRouter.get("/product", productController.getAllProducts)
storeRouter.get("/product/:id", productController.getProduct)