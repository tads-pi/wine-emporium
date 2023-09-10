import app from "./server.js"
import serverless from "serverless-http"
import config from "./config/config.js"

export const handler = serverless(app)

const NON_PROD = config.NODE_ENV === "local"
if (NON_PROD) {
    const port = 8080
    app.listen(port, () => {
        console.log("Listening on port ", port)
    })
}
