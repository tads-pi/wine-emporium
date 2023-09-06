import app from "./server.js"
import serverless from "serverless-http"
import config from "./config/config.js"

export const handler = serverless(app)

const NON_PROD = config.NODE_ENV === "local"
if (NON_PROD) {
    app.listen(3000, () => {
        console.log("Listening on port 3000")
    })
}
