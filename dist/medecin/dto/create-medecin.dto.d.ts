import { Variables } from 'src/utils/Variables';
import { Location } from '../entities/medecin.entity';
export declare class CreateMedecinDto {
    name: string;
    userId: string;
    adresse: string;
    ville: string;
    abonnement: string;
    sexe: string;
    phoneNumber: string;
    email: string;
    description: string;
    speciality: string;
    profile_image: string;
    location: Location;
    variables: Variables[];
    sms_account: number;
}
