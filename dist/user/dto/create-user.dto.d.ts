export declare enum TYPE_USER {
    MEDECIN = "MEDECIN",
    PATIENT = "PATIENT",
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN"
}
export declare enum STATUS_USER {
    ACTIVATE = "ACTIVATE",
    DISABLED = "DISABLED"
}
export declare enum ROLES {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    SECRETAIRE = "SECRETAIRE",
    USER = "USER"
}
export declare class CreateUserDto {
    email?: string;
    phoneNumber?: string;
    password?: string;
    type_user: TYPE_USER;
    verification_code: string;
    resetPasswordToken?: string;
    status: STATUS_USER;
    role: ROLES;
    isGoogle?: boolean;
    isFacebook?: boolean;
}
