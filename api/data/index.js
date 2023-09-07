import conn from "../connections/mysql.js"

const getAll = async () => {
    await conn.execute("SELECT * FROM wine", (err, rows, fields) => {
        if (err) throw err

        console.log("rows: ", rows)
        console.log("fields: ", fields)
    })
}

export const mysqlHelper = {
    getAll
}
