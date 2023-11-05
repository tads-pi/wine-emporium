import AWS from "aws-sdk";
import fs from "fs";
import { Product } from "../../../entity/product.js";

/**
 * Define a região onde salvar as imagens na nuvem
 */
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
            const fileNameWithExtension = item.Key.split("/").pop()
            return {
                key: fileNameWithExtension,
                url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`
            }
        });
    } catch (error) {
        console.error("error getting images from s3: ", error);
        return []
    }
}

export async function removeImageFromFolder(bucketName, folderName, uuidWithExtension) {
    try {
        let deleteObjectParams = {
            Bucket: bucketName,
            Key: `${folderName}/${uuidWithExtension}`,
        };

        const s3Bucket = new AWS.S3();
        await s3Bucket.deleteObject(deleteObjectParams).promise();
    } catch (error) {
        console.error("error removing image from s3: ", error);
    }
}

/**
 * Essa funcao salva uma imagem em buffer no s3
 * @param {*} bucketName 
 * @param {*} imageBuffer 
 * @param {*} targetPath 
 * @param {*} fileName 
 * @param {*} mimeType 
 * @returns Promise<{url: string, error: string}> response
 */
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

export async function getProductImages(bucketName, product = new Product()) {
    try {
        const prefix = `products/${product?.uuid}`
        let listObjectsParams = {
            Bucket: bucketName,
            Prefix: prefix,
        };

        const s3Bucket = new AWS.S3();
        let data = await s3Bucket.listObjectsV2(listObjectsParams).promise();

        data = data.Contents.filter((item) => {
            return item.Key !== `${prefix}/`
        })

        return data.map((item) => {
            const uuidWithExtension = item.Key.split("/").pop()
            const uuid = uuidWithExtension.split(".").shift()
            return {
                key: uuidWithExtension,
                url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
                marked: uuidWithExtension === product?.marked_image_uuid
            }
        });
    } catch (error) {
        console.error("error getting images from s3: ", error);
        return []
    }
}