export declare class CreateOwnpatientDto {
    name: string;
    sexe: string;
    phoneNumber: string;
    adresse: string;
    ville: string;
    email?: string;
    doctorId: string;
    variables?: Variables[];
}
interface Variables {
    name: string;
    value: string;
}
export {};
