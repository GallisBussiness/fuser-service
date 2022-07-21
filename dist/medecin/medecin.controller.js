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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedecinController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const medecin_service_1 = require("./medecin.service");
const update_medecin_dto_1 = require("./dto/update-medecin.dto");
const mongoose_1 = require("mongoose");
const sms_service_1 = require("../sms/sms.service");
const rxjs_1 = require("rxjs");
let MedecinController = class MedecinController {
    constructor(medecinService, smsService) {
        this.medecinService = medecinService;
        this.smsService = smsService;
    }
    create(createMedecinDto) {
        return this.medecinService.create(createMedecinDto);
    }
    findAll() {
        return this.medecinService.findAll();
    }
    async sendSMS(smsDto) {
        const { data: medecin } = await this.medecinService.findOne(smsDto.id);
        if (medecin.sms_account > 0)
            await (0, rxjs_1.lastValueFrom)(this.smsService.sendSms(smsDto.tel, smsDto.message));
        medecin.sms_account = medecin.sms_account - 1;
        await medecin.save();
        return { data: medecin, statusCode: 200 };
    }
    findMedecinByUserId(id) {
        return this.medecinService.findByUserId(id);
    }
    findOne(id) {
        return this.medecinService.findOne(id);
    }
    update(updateMedecinDto) {
        return this.medecinService.update(updateMedecinDto.id, updateMedecinDto);
    }
    remove(id) {
        return this.medecinService.remove(id);
    }
    search(searchTerm) {
        return this.medecinService.search(searchTerm);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('createMedecin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllMedecin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('sendSms'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedecinController.prototype, "sendSMS", null);
__decorate([
    (0, microservices_1.MessagePattern)('findMedecinByUserId'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "findMedecinByUserId", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneMedecin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateMedecin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_medecin_dto_1.UpdateMedecinDto]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeMedecin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('search'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedecinController.prototype, "search", null);
MedecinController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [medecin_service_1.MedecinService,
        sms_service_1.SmsService])
], MedecinController);
exports.MedecinController = MedecinController;
//# sourceMappingURL=medecin.controller.js.map