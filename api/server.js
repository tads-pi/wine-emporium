import express from "express"
import { router } from "./router.js"

const app = express()
app.use(express.json())
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
