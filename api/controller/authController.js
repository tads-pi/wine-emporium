import jwt from "jsonwebtoken"
import config from "../config/config.js";

export const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']
    if (token == null || token == "") return res.sendStatus(401)

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

export const handleBackofficeLogin = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const payload = {
        email: user.email,
    };

    const token = jwt.sign(payload, config.JWT_SECRET);
    res.status(200).json({
        access_token: token
    })
}
