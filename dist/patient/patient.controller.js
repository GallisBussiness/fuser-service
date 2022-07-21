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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const patient_service_1 = require("./patient.service");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const mongoose_1 = require("mongoose");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    create(createPatientDto) {
        return this.patientService.create(createPatientDto);
    }
    registerFromGoogle(createPatientDto) {
        return this.patientService.createByGoogle(createPatientDto);
    }
    findAll() {
        return this.patientService.findAll();
    }
    findOne(id) {
        return this.patientService.findOne(id);
    }
    findMedecinByUserId(id) {
        return this.patientService.findByUserId(id);
    }
    update(updatePatientDto) {
        return this.patientService.update(updatePatientDto.id, updatePatientDto);
    }
    remove(id) {
        return this.patientService.remove(id);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('createPatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('registerUserFromGoogle'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "registerFromGoogle", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllPatient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOnePatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('findPatientByUserId'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findMedecinByUserId", null);
__decorate([
    (0, microservices_1.MessagePattern)('updatePatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_patient_dto_1.UpdatePatientDto]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removePatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "remove", null);
PatientController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
exports.PatientController = PatientController;
//# sourceMappingURL=patient.controller.js.map