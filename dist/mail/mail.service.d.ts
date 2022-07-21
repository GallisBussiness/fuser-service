import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: any): Promise<void>;
    sendUserWelcome(user: any): Promise<void>;
    sendUserNotification(user: any, message: string, subject: string): Promise<void>;
    sendMail(to: string, message: string, subject: string): Promise<void>;
}
