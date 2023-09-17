import app from "./routes/router.js"
import serverless from "serverless-http"
import config from "./config/config.js"

/**
 * @description Inicia o servidor no ambiente serverless
 * @see https://www.npmjs.com/package/serverless-http
 */
export const handler = serverless(app)

const NON_PROD = config.NODE_ENV === "local"
/**
 * @description Inicia o servidor localmente
 */
if (NON_PROD) {
    const port = 8080
    app.listen(port, () => {
        console.log("Listening on port ", port)
    })
}
