import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allows all domains to access the resources (use carefully in production)
    methods: 'GET,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed headers
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000);

}
bootstrap();
