import express from "express"
// mysql
import db from "./connections/mysql.js"
// Controllers
import * as authController from "./controller/authController.js"
import * as backofficeController from "./controller/backofficeController.js"

export const router = express.Router()

router.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})
db.sync(() => console.log(`successfully connected to ${process.env.DB_NAME} db`));

// backoffice login
// req: { username, password }
// res: { token }
router.post("/backoffice/auth", authController.handleBackofficeLogin)

// backoffice CRUD
router.post("/backoffice/user/save", backofficeController.saveBackofficeUser)
router.get("/backoffice/user", backofficeController.getAllBackofficeUsers)
router.get("/backoffice/user/:id", backofficeController.getBackofficeUser)
router.put("/backoffice/user/:id", backofficeController.updateBackofficeUser)
router.delete("/backoffice/user/:id", backofficeController.deleteBackofficeUser)
