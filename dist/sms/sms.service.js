"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const querystring_1 = require("querystring");
let SmsService = class SmsService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
    }
    authenticate() {
        return this.http
            .post('https://api.orange.com/oauth/v3/token', (0, querystring_1.stringify)({
            grant_type: 'client_credentials',
        }), {
            headers: {
                Authorization: this.config.get('SMS_AUTHORIZATION_HEADER'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .pipe((0, rxjs_1.map)((res) => res.data));
    }
    sendSms(recevers, message) {
        return this.authenticate().pipe((0, rxjs_1.mergeMap)(({ access_token }) => this.http.post(`https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B221${this.config.get('SMS_FROM')}/requests`, {
            outboundSMSMessageRequest: {
                address: recevers.map((r) => `tel:+221${r}`),
                senderAddress: `tel:+221${this.config.get('SMS_FROM')}`,
                senderName: 'Freedocteur',
                outboundSMSTextMessage: {
                    message: `${message}`,
                },
            },
        }, {
            headers: {
                ContentType: 'application/json',
                Authorization: 'Bearer ' + access_token,
            },
        })));
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map