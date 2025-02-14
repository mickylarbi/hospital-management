import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allows all domains to access the resources (use carefully in production)
    methods: 'GET,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
  });

  const config = new DocumentBuilder()
    .setTitle('Prayer Social')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000);

}
bootstrap();
