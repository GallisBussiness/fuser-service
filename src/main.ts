/* eslint-disable prettier/prettier */
/**
 * @ts-ignore
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';


const port = parseInt(process.env.PORT, 10); 

const Options: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: port,
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
  app.listen().then(() => logger.log(`userService is listen on port : ${port}`));
}
bootstrap();
