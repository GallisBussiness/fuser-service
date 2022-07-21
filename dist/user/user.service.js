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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const createdUser = new this.userModel(createUserDto);
            const user = await createdUser.save();
            return { data: user, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async createSuperAdmin(createUserDto) {
        return this.create(Object.assign(Object.assign({}, createUserDto), { role: create_user_dto_1.ROLES.SUPER_ADMIN, type_user: create_user_dto_1.TYPE_USER.SUPER_ADMIN, status: create_user_dto_1.STATUS_USER.ACTIVATE }));
    }
    async registerUserFromGoogle(createUserDto) {
        try {
            const { phoneNumber } = createUserDto;
            const { data: u } = await this.findByUsername(phoneNumber);
            if (u !== null)
                throw new microservices_1.RpcException('user already exists');
            const userGoogle = Object.assign(Object.assign({}, createUserDto), { isGoogle: true });
            const createdUser = new this.userModel(userGoogle);
            const user = await createdUser.save();
            return { data: user, statusCode: 200 };
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
            const users = await this.userModel.find().exec();
            return { data: users, statusCode: 200 };
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
            const user = await this.userModel.findById(id);
            return { data: user, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async ifadmin() {
        try {
            const user = await this.userModel.findOne({ role: create_user_dto_1.ROLES.SUPER_ADMIN });
            return user !== null;
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async findByUsername(username) {
        try {
            const user = await this.userModel.findOne({
                $or: [{ email: username }, { phoneNumber: username }],
            });
            if (user !== null) {
                return { data: user, statusCode: 200 };
            }
            return { data: null, statusCode: 404 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
    async update(id, updateUserDto) {
        try {
            const result = await await this.userModel.findByIdAndUpdate(id, updateUserDto);
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
            const r = await await this.userModel.findByIdAndDelete(id);
            return { data: r, statusCode: 200 };
        }
        catch (error) {
            throw new microservices_1.RpcException({
                message: error.message,
                statusCode: 500,
            });
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map