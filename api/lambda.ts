import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer: any;
export const handler = async (event: any, context: any) => {
    if (!cachedServer) {
        const app = await NestFactory.create(AppModule);

        // Algumas configs
        app.use(json({ limit: '10mb' }))
        app.useGlobalPipes(new ValidationPipe({
            // essa flag define que as dtos só podem ter os campos informados no tipo
            // evitando sql injection e etc!
            whitelist: true,
        }));

        // Swagger
        const config = new DocumentBuilder()
            .setTitle('Wine Emporium')
            .setDescription('Wine Emporium API')
            .setVersion('0.2')
            .addSecurity('bearer', {
                type: 'http',
                scheme: 'bearer',
            })
            .addServer('http://localhost:3000')
            .addServer('https://api.wineemporium.shop')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);

        // App
        await app.init();
        cachedServer = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
    }

    return cachedServer(event, context);
}
