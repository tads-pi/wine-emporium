import express from "express"
import { router } from "./router.js"

const app = express()

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

// use router
app.use(router)

export default app
