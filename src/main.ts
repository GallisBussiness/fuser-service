/* eslint-disable prettier/prettier */
/**
 * @ts-ignore
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

const Options: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    port: 80,
  },
};
const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    Options,
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );
  app.listen().then(() => logger.log('userService is listen on port : 1000'));
}
bootstrap();
