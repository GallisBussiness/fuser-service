import { Module } from '@nestjs/common';
import { OwnpatientService } from './ownpatient.service';
import { OwnpatientController } from './ownpatient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ownpatient, OwnpatientSchema } from './entities/ownpatient.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ownpatient.name,
        schema: OwnpatientSchema,
      },
    ]),
  ],
  controllers: [OwnpatientController],
  providers: [OwnpatientService],
})
export class OwnpatientModule {}
