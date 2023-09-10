import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({
    region: "sa-east-1",
});

/**
 * Essa funcao salva uma imagem local no s3
 * 
 * @param {*} bucketName 
 * @param {*} localPath 
 * @param {*} fileName 
 * @param {*} targetPath 
 * @param {*} contentType 
 * @returns {Promise<string>} url
 */
export async function saveLocalImage(bucketName, localPath, fileName, targetPath, contentType = "image/jpeg") {
    try {
        let saveImageParams = {
            Bucket: bucketName,
            Key: `${targetPath}/${fileName}.jpg`,
            Body: fs.createReadStream(`${localPath}/${fileName}.jpg`),
            ACL: "public-read",
            ContentType: contentType,
        };
        console.log("saving image to s3: ", saveImageParams);

        const s3Bucket = new AWS.S3();
        await s3Bucket.putObject(saveImageParams).promise();

        return `https://${bucketName}.s3.amazonaws.com/${targetPath}/${fileName}`;
    } catch (error) {
        console.log("error saving image to s3: ", error);
        return ""
    }
}

/**
 * Essa funcao retorna uma lista de imagens de uma pasta no s3
 * 
 * @param {*} bucketName 
 * @param {*} folderName 
 * @returns 
 */
export async function getImagesFromFolder(bucketName, folderName) {
    try {
        let listObjectsParams = {
            Bucket: bucketName,
            Prefix: folderName,
        };

        const s3Bucket = new AWS.S3();
        const data = await s3Bucket.listObjectsV2(listObjectsParams).promise();

        return data.Contents.map((item) => {
            return `https://${bucketName}.s3.amazonaws.com/${item.Key}`;
        });
    } catch (error) {
        console.log("error getting images from s3: ", error);
        return []
    }
}

export async function saveBufferedImage(bucketName, imageBuffer, targetPath, fileName, mimeType) {
    const response = {
        url: "",
        error: ""
    }
    try {
        const extension = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/gif": "gif",
        };
        const fileExtension = extension[mimeType]
        if (!fileExtension) {
            response.error = `Tipo de imagem inválido '${mimeType}'`
            return response
        }

        let saveImageParams = {
            Bucket: bucketName,
            Key: `${targetPath}/${fileName}.${fileExtension}`,
            Body: imageBuffer,
            ACL: "public-read",
            ContentType: mimeType,
        };

        console.log("saving image to s3: ", saveImageParams.Key);

        const s3Bucket = new AWS.S3();
        await s3Bucket.putObject(saveImageParams).promise();

        response.url = `https://${bucketName}.s3.amazonaws.com/${targetPath}/${fileName}.${fileExtension}`
        return response
    } catch (error) {
        console.log("error saving image to s3: ", error);
        response.error = error?.message ?? ""
        return response
    }
}
