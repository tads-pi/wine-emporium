import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js"
import BackofficeUserRepository from "../repository/backofficeUserRepository.js"
import { BackofficeUser } from "../models/backofficeUser.js"

async function findUser(user = {
    email: ""
}) {
    const findClause = {
        where: {
            email: user.email
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
    const token = req.headers?.authorization ?? ""
    if (token == null || token === "") return res.sendStatus(401)

    jwt.verify(token, config.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        const userContext = await getUserFromToken(token)

        req.body.user_context = userContext
        // todo handle if user has permissions here
        next()
    })
}

export const handleBackofficeLogin = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const foundUser = await findUser(user)
    if (!foundUser) {
        res.status(404).json()
    }

    if (bcrypt.compareSync(user.password, foundUser.password)) {
        const token = jwt.sign({
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
