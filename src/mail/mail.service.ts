import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any) {
    const url = `${user.verification_code}`;

    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenue à Freedocteur! Confirmer votre compte svp!!',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        url,
      },
    });
  }

  async sendUserWelcome(user: any) {
    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenue à Freedocteur! Confirmer votre compte svp!!',
      template: 'welcome', // `.hbs` extension is appended automatically
      context: {},
    });
  }

  async sendUserNotification(user: any, message: string, subject: string) {
    await this.mailerService.sendMail({
      to: user.username,
      // from: '"Support Team" <support@example.com>', // override default from
      subject,
      template: 'notification', // `.hbs` extension is appended automatically
      context: { message },
    });
  }

  async sendMail(to: string, message: string, subject: string) {
    await this.mailerService.sendMail({
      to,
      // from: '"Support Team" <support@example.com>', // override default from
      subject,
      template: 'mail', // `.hbs` extension is appended automatically
      context: { message },
    });
  }
}
