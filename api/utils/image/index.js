import fs from "fs"

/**
 * Essa funcao converte uma imagem em base64 para uma imagem em arquivo
 * 
 * @param {string} base64String
 * @param {string} path
 * @returns {Promise<Function>} removeTempDir
 * @example
 * const imageBase64 = await imageToBase64("path/to/image.png")
 * console.log(imageBase64)
 */
export async function base64ToImage(base64String, path, fileName) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }

        base64String = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
        fs.writeFile(`${path}/${fileName}`, base64String, { encoding: "base64" }, function (err) {
            if (err) {
                removeDir(path)
                throw err
            }
        });
    } catch (error) {
        console.log("error saving image: ", error)
        removeDir(path)
    }
}

/**
 * Essa funcao remove um diretorio
 * 
 * @param {string} path
 * @returns {void}
 * @example
 * removeDir("path/to/dir")
 * 
 */
export function removeDir(path) {
    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true })
        }
    } catch (error) {
        console.log("error removing temp dir: ", error)
    }
}

export function getBase64ImageParams(base64) {
    const base64Parts = base64.split(";base64,")
    const mimeType = base64Parts[0].replace("data:", "")
    const base64String = base64Parts[1]
    return {
        mimeType,
        base64String
    }
}