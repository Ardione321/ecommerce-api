import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await appCreate(app);
  const port = process.env.PORT ?? 3000;
  await app.listen({ port: Number(port), host: '0.0.0.0' });
}
bootstrap();
