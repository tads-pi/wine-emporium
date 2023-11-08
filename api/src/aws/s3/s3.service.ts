import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
    private config: ConfigService
    private readonly bucket: string
    private client: AWS.S3

    constructor(config: ConfigService) {
        this.config = config

        AWS.config.update({
            region: "sa-east-1",
        })
        this.bucket = this.config.get<string>("S3_BUCKET_NAME")

        this.client = new AWS.S3({})
    }

    async saveBufferedImage(
        imageBuffer: Buffer,
        targetPath: string,
        fileName: string,
        mimeType: string,
    ): Promise<string> {
        const extension = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/gif": "gif",
        };
        const fileExtension = extension[mimeType]
        if (!fileExtension) {
            throw new Error(`Tipo de imagem inválido '${mimeType}'`)
        }

        let saveImageParams = {
            Bucket: this.bucket,
            Key: `${targetPath}/${fileName}.${fileExtension}`,
            Body: imageBuffer,
            ACL: "public-read",
            ContentType: mimeType,
        };

        await this.client.putObject(saveImageParams).promise();

        return `https://${this.bucket}.s3.amazonaws.com/${targetPath}/${fileName}.${fileExtension}`
    }

    async getImagesFromFolder(folder: string) {
        let listObjectsParams = {
            Bucket: this.bucket,
            Prefix: folder,
        };

        const data = await this.client.listObjectsV2(listObjectsParams).promise();
        const images = data.Contents.map((item) => {
            const fileNameWithExtension = item.Key.split("/").pop() // apaga nome da pasta
            return {
                key: fileNameWithExtension,
                url: `https://${this.bucket}.s3.amazonaws.com/${item.Key}`
            }
        });

        // Por algum motivo, o S3 retorna um objeto vazio no primeiro item
        return images.filter((img) => img.key);
    }

    async removeImageFromFolder(folder: string, imageUUIDWithExtension: string) {
        let deleteObjectParams = {
            Bucket: this.bucket,
            Key: `${folder}/${imageUUIDWithExtension}`,
        };

        await this.client.deleteObject(deleteObjectParams).promise();
    }
}
