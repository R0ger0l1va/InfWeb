import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v2 as cloudinary } from 'cloudinary';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  app.enableCors({
    origin: [
      ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : []),
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ],
    credentials: true, // permite el uso de cookies o encabezados de autorización
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'cache',
      'X-Requested-With',
      'Accept',
      'Origin',
      'X-File-Name', // si usas headers personalizados
    ],
  });
  const config = new DocumentBuilder()
    .setTitle('OrkY - API')
    .setDescription('API para la pagina web de la facultad de Ing Informatica')
    .setVersion('1.0')
    .addTag('Album')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('orky/doc', app, document); // Accesible en /orky/doc

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((err) => {
  console.error('Error starting application', err);
});
