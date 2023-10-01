import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js"
import BackofficeUser from "../entity/backofficeUser.js"
import authService from "../service/authService.js"

/**
 * retorna um usuario do banco de dados a partir de um token
 * @param {string} token
 * @returns {Promise<BackofficeUser>}
 */
async function getUserFromToken(token) {
    const decoded = jwt.decode(token)
    const user = await authService.findUser(decoded)
    return new BackofficeUser(user?.dataValues || {})
}

/**
 * middleware para autenticar um usuário com token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 */
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

    jwt.verify(token, config.JWT_SECRET, async (err) => {
        if (err) return res.sendStatus(401)
        const userContext = await getUserFromToken(token)

        req.context.user = userContext
        // todo handle if user has permissions here
        next()
    })
}

/**
 * rota para gerar um token de autenticação
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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
        res.status(400).json({
            message: "e-mail ou senha incorretos"
        })
    }
}

export default {
    authenticateToken,
    handleBackofficeLogin
}