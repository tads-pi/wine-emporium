// connects to mysql database
import mysql from "mysql2"

console.log("DB_HOST: ", process.env.DB_HOST)

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})

export default conn
