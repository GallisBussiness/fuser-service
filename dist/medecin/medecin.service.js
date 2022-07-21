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
exports.MedecinService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_service_1 = require("../user/user.service");
const Helpers_1 = require("../utils/Helpers");
const medecin_entity_1 = require("./entities/medecin.entity");
let MedecinService = class MedecinService {
    constructor(medecinModel, userService) {
        this.medecinModel = medecinModel;
        this.userService = userService;
    }
    async create(createMedecinDto) {
        try {
            const { email, phoneNumber, password } = createMedecinDto, rest = __rest(createMedecinDto, ["email", "phoneNumber", "password"]);
            const verif_cde = (0, Helpers_1.genRanNumber)(6);
            const userField = {
                email,
                phoneNumber,
                password,
                type_user: create_user_dto_1.TYPE_USER.MEDECIN,
                role: create_user_dto_1.ROLES.USER,
                status: create_user_dto_1.STATUS_USER.DISABLED,
                verification_code: verif_cde,
            };
            const res = await this.userService.create(userField);
            const { statusCode } = res;
            if (statusCode !== 200)
                return res;
            const { data: { _id }, } = res;
            const medecinField = Object.assign(Object.assign({ email,
                phoneNumber }, rest), { userId: _id });
            const createdMedecin = new this.medecinModel(medecinField);
            const medecin = await createdMedecin.save();
            return { data: medecin, statusCode: 200 };
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
            const medecins = await this.medecinModel.find().exec();
            return { data: medecins, statusCode: 200 };
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
            const medecin = await this.medecinModel.findById(id);
            if (!medecin)
                throw new microservices_1.RpcException('user not found !');
            return { data: medecin, statusCode: 200 };
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
            const medecin = await this.medecinModel.findOne({
                userId: new mongoose_2.Types.ObjectId(id),
            });
            if (!medecin)
                throw new common_1.NotFoundException();
            return { data: medecin, statusCode: 200 };
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
            const result = await this.medecinModel.findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), updateMedecinDto);
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
            return {
                data: await this.medecinModel.findByIdAndDelete(id),
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
    async search(searchTerm) {
        try {
            return {
                data: await this.medecinModel
                    .find({
                    $or: [
                        { name: { $regex: '.*' + searchTerm + '.*' } },
                        { ville: { $regex: '.*' + searchTerm + '.*' } },
                    ],
                })
                    .limit(10),
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
MedecinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medecin_entity_1.Medecin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], MedecinService);
exports.MedecinService = MedecinService;
//# sourceMappingURL=medecin.service.js.map