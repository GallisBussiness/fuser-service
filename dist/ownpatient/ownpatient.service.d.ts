import { Model } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateOwnpatientDto } from './dto/create-ownpatient.dto';
import { UpdateOwnpatientDto } from './dto/update-ownpatient.dto';
import { OwnpatientDocument } from './entities/ownpatient.entity';
export declare class OwnpatientService {
    private ownpatientModel;
    constructor(ownpatientModel: Model<OwnpatientDocument>);
    create(createOwnpatientDto: CreateOwnpatientDto): Promise<ResponseServiceInterface>;
    findAll(): Promise<ResponseServiceInterface>;
    findByMedecin(id: string): Promise<ResponseServiceInterface>;
    findOne(id: string): Promise<ResponseServiceInterface>;
    update(id: string, updateOwnpatientDto: UpdateOwnpatientDto): Promise<ResponseServiceInterface>;
    remove(id: string): Promise<ResponseServiceInterface>;
}
