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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const mail_service_1 = require("../mail/mail.service");
const sms_service_1 = require("../sms/sms.service");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_service_1 = require("../user/user.service");
const Helpers_1 = require("../utils/Helpers");
const patient_entity_1 = require("./entities/patient.entity");
let PatientService = class PatientService {
    constructor(patientModel, userService, mailService, smsService, event) {
        this.patientModel = patientModel;
        this.userService = userService;
        this.mailService = mailService;
        this.smsService = smsService;
        this.event = event;
    }
    async create(createPatientDto) {
        try {
            const { email, phoneNumber, password } = createPatientDto, rest = __rest(createPatientDto, ["email", "phoneNumber", "password"]);
            const verif_cde = (0, Helpers_1.genRanNumber)(6);
            const userField = {
                email,
                phoneNumber,
                password,
                type_user: create_user_dto_1.TYPE_USER.PATIENT,
                role: create_user_dto_1.ROLES.USER,
                status: create_user_dto_1.STATUS_USER.DISABLED,
                verification_code: verif_cde,
            };
            const res = await this.userService.create(userField);
            const { statusCode } = res;
            if (statusCode !== 200)
                return res;
            const { data: { _id }, } = res;
            const patientField = Object.assign(Object.assign({}, rest), { email,
                phoneNumber, userId: _id });
            const createdPatient = new this.patientModel(patientField);
            const patient = await createdPatient.save();
            this.event.emit('user.created', Object.assign(Object.assign({}, userField), { phoneNumber: createPatientDto.phoneNumber }));
            return { data: patient, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async createByGoogle(createPatientUserDto) {
        try {
            const { email, password } = createPatientUserDto, rest = __rest(createPatientUserDto, ["email", "password"]);
            const verif_cde = (0, Helpers_1.genRanNumber)(6);
            const userField = {
                email,
                password,
                type_user: create_user_dto_1.TYPE_USER.PATIENT,
                role: create_user_dto_1.ROLES.USER,
                status: create_user_dto_1.STATUS_USER.DISABLED,
                verification_code: verif_cde,
            };
            const res = await this.userService.registerUserFromGoogle(userField);
            const { statusCode } = res;
            if (statusCode !== 200)
                return res;
            const { data: { _id }, } = res;
            const patientField = Object.assign(Object.assign({}, rest), { userId: _id });
            const createdPatient = new this.patientModel(patientField);
            const patient = await createdPatient.save();
            return { data: patient, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async findAll() {
        try {
            const patients = await this.patientModel.find();
            return { data: patients, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async findOne(id) {
        try {
            const patient = await this.patientModel.findById(id);
            if (!patient)
                return new common_1.NotFoundException();
            return { data: patient, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async findByUserId(id) {
        try {
            const patient = await this.patientModel.findOne({
                userId: new mongoose_2.Types.ObjectId(id),
            });
            if (patient === null)
                throw new common_1.NotFoundException();
            return { data: patient, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async update(id, updateMedecinDto) {
        try {
            const result = await this.patientModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), updateMedecinDto);
            return { data: result, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async remove(id) {
        try {
            const data = await this.patientModel.findByIdAndDelete(id);
            if (data) {
                this.event.emit('user.deleted', data.userId);
                return {
                    data,
                    statusCode: 200,
                };
            }
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async handleUserCreatedEvent(user) {
        if (user.type_user === create_user_dto_1.TYPE_USER.PATIENT) {
            await this.mailService.sendUserConfirmation(user);
        }
        else {
            await this.mailService.sendUserWelcome(user);
        }
        await (0, rxjs_1.lastValueFrom)(this.smsService.sendSms(['779265736'], 'Hello World!'));
    }
    async handleUserDeletedEvent(id) {
        await this.userService.remove(id);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('user.created', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], PatientService.prototype, "handleUserCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('user.deleted', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientService.prototype, "handleUserDeletedEvent", null);
PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_entity_1.Patient.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        mail_service_1.MailService,
        sms_service_1.SmsService,
        event_emitter_1.EventEmitter2])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map