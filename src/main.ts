import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const ip = '192.168.20.231'
  await app.listen(3000, ip);
}
bootstrap();
