import { OwnpatientService } from './ownpatient.service';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';
export declare class OwnpatientController {
    private readonly ownpatientService;
    constructor(ownpatientService: OwnpatientService);
    create(createOwnpatientDto: CreateOwnpatientDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findByMedecin(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findAll(): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findOne(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    update(updateOwnpatientDto: UpdateOwnpatientDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    remove(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
}
