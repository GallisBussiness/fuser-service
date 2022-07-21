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
exports.OwnpatientService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ownpatient_entity_1 = require("./entities/ownpatient.entity");
let OwnpatientService = class OwnpatientService {
    constructor(ownpatientModel) {
        this.ownpatientModel = ownpatientModel;
    }
    async create(createOwnpatientDto) {
        try {
            const ownPatient = await this.ownpatientModel.create(createOwnpatientDto);
            return { data: await ownPatient.save(), statusCode: 200 };
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
            return { data: await this.ownpatientModel.find(), statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async findByMedecin(id) {
        try {
            return {
                data: await this.ownpatientModel.find({ doctorId: id }),
                statusCode: 200,
            };
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
            return { data: await this.ownpatientModel.findById(id), statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async update(id, updateOwnpatientDto) {
        try {
            return {
                data: await this.ownpatientModel.findByIdAndUpdate(id, updateOwnpatientDto),
                statusCode: 200,
            };
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
            return {
                data: await this.ownpatientModel.findByIdAndDelete(id),
                statusCode: 200,
            };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
};
OwnpatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ownpatient_entity_1.Ownpatient.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OwnpatientService);
exports.OwnpatientService = OwnpatientService;
//# sourceMappingURL=ownpatient.service.js.map