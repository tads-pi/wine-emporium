/* eslint-disable no-undef */
import dotenv from "dotenv"
dotenv.config()

const config = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PASS: process.env.DB_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}

export default config
