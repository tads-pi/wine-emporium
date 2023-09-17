import express from "express"

export const storeRouter = express.Router()

storeRouter.get("/product", async (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})
