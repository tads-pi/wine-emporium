import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js"
import BackofficeUserRepository from "../repository/backofficeUserRepository.js"
import { BackofficeUser } from "../models/backofficeUser.js"

async function findUser(user = {
    username: ""
}) {
    const findClause = {
        where: {
            username: user.username
        }
    }

    return await BackofficeUserRepository.findOne(findClause)
}

export async function getUserFromToken(token) {
    const decoded = jwt.decode(token)
    const { dataValues: user } = await findUser(decoded)
    return new BackofficeUser(user)
}

export const authenticateToken = async (req, res, next) => {
    if (config.NODE_ENV === "local") {
        req.context = {
            user: null
        }

        req.context.user = new BackofficeUser({
            id: 1,
            name: "Admin",
            username: "admin",
            document: "012.345.678-90",
            email: "email@example.com",
            group: "ADMINISTRADOR",
            active: true,
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        next()
        return
    }

    let token = req.headers?.authorization ?? ""
    if (token == null || token === "") return res.sendStatus(401)

    token = token.split("Bearer ")[1] || ""
    jwt.verify(token, config.JWT_SECRET, async (err) => {
        if (err) return res.sendStatus(403)
        const userContext = await getUserFromToken(token)

        req.context.user = userContext
        // todo handle if user has permissions here
        next()
    })
}

export const handleBackofficeLogin = async (req, res) => {
    const user = {
        username: req.body?.username ?? "",
        password: req.body?.password ?? "",
    }

    const foundUser = await findUser(user)
    if (!foundUser || foundUser === null || foundUser === undefined) {
        res.status(404).json()
        return
    }

    if (bcrypt.compareSync(user.password, foundUser.password)) {
        const token = jwt.sign({
            username: user.username,
            email: user.email,
            group: user.group
        }, config.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: 3600
        })

        res.status(200).json({
            access_token: token,
            expires_in: 3600
        })
    } else {
        res.status(401).json({
            message: "Usuário ou senha inválidos"
        })
    }
}
