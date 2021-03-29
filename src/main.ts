import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createConnection().then(async (conn) => {
    await conn.runMigrations();
    await app.listen(parseInt(process.env.PORT, 10) || 3000);
  });
}
bootstrap();
