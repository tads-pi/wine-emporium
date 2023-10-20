import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js"
import BackofficeUser from "../entity/backofficeUser.js"
import authService from "../service/authService.js"
import User from "../entity/user.js"

async function getUserFromToken(token) {
    const decoded = jwt.decode(token)
    const backofficeUser = await authService.findUser(decoded)
    if (backofficeUser) {
        return new BackofficeUser(backofficeUser?.dataValues || {})
    }

    const storeUser = await authService.findStoreUser(decoded)
    if (storeUser) {
        return new User(storeUser?.dataValues || {})
    }
}

const authenticateToken = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        res.status(200).json({})
        return
    }

    req.context = {
        user: null
    }

    let token = req.headers?.authorization ?? ""
    if (!token) return res.sendStatus(401)

    token = token.replace("Bearer ", "")

    jwt.verify(token, config.JWT_SECRET, async (err) => {
        if (err) return res.sendStatus(401)
        const userContext = await getUserFromToken(token)

        req.context.user = userContext
        // todo handle if user has permissions here
        next()
    })
}

const handleBackofficeLogin = async (req, res) => {
    const user = {
        email: req.body?.email ?? "",
        password: req.body?.password ?? "",
    }

    const foundUser = await authService.findUser(user)
    if (!foundUser) {
        res.status(400).json({
            message: "e-mail ou senha incorretos"
        })
        return
    }

    if (bcrypt.compareSync(user?.password || "", foundUser?.dataValues?.password || "")) {
        const token = jwt.sign({
            email: user.email,
            group: foundUser?.dataValues?.group
        }, config.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: 3600
        })

        res.status(200).json({
            access_token: token,
            expires_in: 3600
        })
    } else {
        res.status(400).json({
            message: "e-mail ou senha incorretos"
        })
    }
}

const handleStoreLogin = async (req, res) => {
    const user = {
        email: req.body?.email ?? "",
        password: req.body?.password ?? "",
    }

    const foundUser = await authService.findStoreUser(user)
    if (!foundUser) {
        res.status(400).json({
            message: "e-mail ou senha incorretos"
        })
        return
    }

    if (bcrypt.compareSync(user?.password || "", foundUser?.dataValues?.password || "")) {
        const token = jwt.sign({
            id: foundUser?.dataValues?.uuid,
            email: user.email,
            name: foundUser?.dataValues?.name,
            birthDate: foundUser?.dataValues?.birthDate,
            address: foundUser?.dataValues?.address,
            gender: foundUser?.dataValues?.gender,
        }, config.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: 3600
        })

        res.status(200).json({
            access_token: token,
            expires_in: 3600
        })
    } else {
        res.status(400).json({
            message: "e-mail ou senha incorretos"
        })
    }
}

export default {
    authenticateToken,
    handleBackofficeLogin,
    handleStoreLogin
}