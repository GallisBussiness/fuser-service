import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { PatientModule } from './patient/patient.module';
import { MedecinModule } from './medecin/medecin.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './rpc-exception.filter';
import { HttpExceptionFilter } from './http-exception-filter';
import { MailModule } from './mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OwnpatientModule } from './ownpatient/ownpatient.module';
import { SmsModule } from './sms/sms.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    PatientModule,
    MedecinModule,
    MailModule,
    OwnpatientModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
