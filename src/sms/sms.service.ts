import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, mergeMap } from 'rxjs';
import { stringify } from 'querystring';

@Injectable()
export class SmsService {
  constructor(private config: ConfigService, private http: HttpService) {}

  authenticate() {
    return this.http
      .post(
        'https://api.orange.com/oauth/v3/token',
        stringify({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            Authorization: this.config.get('SMS_AUTHORIZATION_HEADER'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((res) => res.data));
  }

  sendSms(recevers: string[], message: string) {
    return this.authenticate().pipe(
      mergeMap(({ access_token }) =>
        this.http.post(
          `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B221${this.config.get(
            'SMS_FROM',
          )}/requests`,
          {
            outboundSMSMessageRequest: {
              address: recevers.map((r) => `tel:+221${r}`),
              senderAddress: `tel:+221${this.config.get('SMS_FROM')}`,
              senderName: 'Freedocteur',
              outboundSMSTextMessage: {
                message: `${message}`,
              },
            },
          },
          {
            headers: {
              ContentType: 'application/json',
              Authorization: 'Bearer ' + access_token,
            },
          },
        ),
      ),
    );
  }
}
