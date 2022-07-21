import { Module } from '@nestjs/common';
import { MedecinService } from './medecin.service';
import { MedecinController } from './medecin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medecin, MedecinSchema } from './entities/medecin.entity';
import { UserModule } from 'src/user/user.module';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Medecin.name, schema: MedecinSchema }]),
    UserModule,
    SmsModule,
  ],
  controllers: [MedecinController],
  providers: [MedecinService],
})
export class MedecinModule {}
