import express from "express"
import User from "./models/user.js"
import { mysqlHelper } from "./data/index.js"

export const router = express.Router()

router.post("/", (req, res) => {
    const user = new User(req.body)

    // TEST
    mysqlHelper.getAll(user)

    res.status(200).json({
        message: `Hello, ${user.name}!`
    })
})

router.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})
