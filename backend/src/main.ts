import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log seguro de variables de conexión a BD (usuario, host, puerto, bd). Contraseña parcialmente enmascarada.
  const dbUser = process.env.POSTGRES_USER || '<unset>';
  const dbHost = process.env.POSTGRES_HOST || '<unset>';
  const dbPort = process.env.POSTGRES_PORT || '<unset>';
  const dbName = process.env.POSTGRES_DB || '<unset>';
  const dbPass = process.env.POSTGRES_PASSWORD || '';
  const maskedPass = dbPass ? (dbPass.length > 4 ? dbPass.slice(0,2) + '***' + dbPass.slice(-1) : '***') : '<unset>';
  console.log('[config] DB user=%s host=%s port=%s db=%s password=%s', dbUser, dbHost, dbPort, dbName, maskedPass);
  
  // Configuración de CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-HTTP-Method-Override',
    ],
    credentials: true,
  });

  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remueve propiedades que no están en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
    transform: true, // Transforma los tipos automáticamente
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor corriendo en puerto ${process.env.PORT ?? 3000}`);
}
bootstrap();
