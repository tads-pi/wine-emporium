import app from "./server.js"
import serverless from "serverless-http"
import dotenv from "dotenv"

dotenv.config()

export const handler = serverless(app)

const NON_PROD = process.env.NODE_ENV !== "production"
if (NON_PROD) {
    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}
