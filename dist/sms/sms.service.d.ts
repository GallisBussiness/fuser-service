import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class SmsService {
    private config;
    private http;
    constructor(config: ConfigService, http: HttpService);
    authenticate(): import("rxjs").Observable<any>;
    sendSms(recevers: string[], message: string): import("rxjs").Observable<import("axios").AxiosResponse<any, any>>;
}
