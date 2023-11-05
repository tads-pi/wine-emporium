import fs from "fs"
import swaggerUi from "swagger-ui-express"
import express from "express"

export const swaggerRouter = express.Router()
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
swaggerRouter.use("/", swaggerUi.serve, swaggerUi.setup(loadJSON("../swagger.json")))
