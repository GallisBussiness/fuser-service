import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OwnpatientService } from './ownpatient.service';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';

@Controller()
export class OwnpatientController {
  constructor(private readonly ownpatientService: OwnpatientService) {}

  @MessagePattern('createOwnpatient')
  create(@Payload() createOwnpatientDto: CreateOwnpatientDto) {
    return this.ownpatientService.create(createOwnpatientDto);
  }

  @MessagePattern('findAllOwnpatientByMedecin')
  findByMedecin(@Payload() id: string) {
    return this.ownpatientService.findByMedecin(id);
  }

  @MessagePattern('findAllOwnpatient')
  findAll() {
    return this.ownpatientService.findAll();
  }

  @MessagePattern('findOneOwnpatient')
  findOne(@Payload() id: string) {
    return this.ownpatientService.findOne(id);
  }

  @MessagePattern('updateOwnpatient')
  update(@Payload() updateOwnpatientDto: UpdateOwnpatientDto) {
    return this.ownpatientService.update(
      updateOwnpatientDto.id,
      updateOwnpatientDto,
    );
  }

  @MessagePattern('removeOwnpatient')
  remove(@Payload() id: string) {
    return this.ownpatientService.remove(id);
  }
}
