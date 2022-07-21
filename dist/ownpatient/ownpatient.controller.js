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
exports.OwnpatientController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const ownpatient_service_1 = require("./ownpatient.service");
const create_ownpatient_dto_1 = require("./dto/create-ownpatient.dto");
const update_ownpatient_dto_1 = require("./dto/update-ownpatient.dto");
let OwnpatientController = class OwnpatientController {
    constructor(ownpatientService) {
        this.ownpatientService = ownpatientService;
    }
    create(createOwnpatientDto) {
        return this.ownpatientService.create(createOwnpatientDto);
    }
    findByMedecin(id) {
        return this.ownpatientService.findByMedecin(id);
    }
    findAll() {
        return this.ownpatientService.findAll();
    }
    findOne(id) {
        return this.ownpatientService.findOne(id);
    }
    update(updateOwnpatientDto) {
        return this.ownpatientService.update(updateOwnpatientDto.id, updateOwnpatientDto);
    }
    remove(id) {
        return this.ownpatientService.remove(id);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('createOwnpatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ownpatient_dto_1.CreateOwnpatientDto]),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllOwnpatientByMedecin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "findByMedecin", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllOwnpatient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneOwnpatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateOwnpatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ownpatient_dto_1.UpdateOwnpatientDto]),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeOwnpatient'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OwnpatientController.prototype, "remove", null);
OwnpatientController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ownpatient_service_1.OwnpatientService])
], OwnpatientController);
exports.OwnpatientController = OwnpatientController;
//# sourceMappingURL=ownpatient.controller.js.map