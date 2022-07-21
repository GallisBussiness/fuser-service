"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const app_controller_1 = require("./app.controller");
const patient_module_1 = require("./patient/patient.module");
const medecin_module_1 = require("./medecin/medecin.module");
const core_1 = require("@nestjs/core");
const rpc_exception_filter_1 = require("./rpc-exception.filter");
const http_exception_filter_1 = require("./http-exception-filter");
const mail_module_1 = require("./mail/mail.module");
const config_1 = require("@nestjs/config");
const ownpatient_module_1 = require("./ownpatient/ownpatient.module");
const sms_module_1 = require("./sms/sms.module");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async (config) => ({
                    uri: config.get('MONGODB_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            user_module_1.UserModule,
            patient_module_1.PatientModule,
            medecin_module_1.MedecinModule,
            mail_module_1.MailModule,
            ownpatient_module_1.OwnpatientModule,
            sms_module_1.SmsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: rpc_exception_filter_1.ExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map