import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // essa flag define que as dtos só podem ter os campos informados no tipo
    // evitando sql injection e etc!
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Wine Emporium')
    .setDescription('Wine Emporium API')
    .setVersion('0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  logAvailableRoutes(app)
}
bootstrap();


function logAvailableRoutes(app: INestApplication<any>) {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(item => item !== undefined);
  console.log(availableRoutes);
}
