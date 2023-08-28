import conn from "../connections/mysql.js"
import User from "../models/user.js"

const getAll = async (user = new User()) => {
    await conn.execute("SELECT * FROM wine", (err, rows, fields) => {
        if (err) throw err

        console.log("rows: ", rows)
        console.log("fields: ", fields)
    })
}

export const mysqlHelper = {
    getAll
}
