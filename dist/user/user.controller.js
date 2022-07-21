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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const create_mail_dto_1 = require("./dto/create-mail.dto");
const mail_service_1 = require("../mail/mail.service");
let UserController = class UserController {
    constructor(userService, emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    login(username) {
        return this.userService.findByUsername(username);
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    createSuperAdmin(createUserDto) {
        return this.userService.createSuperAdmin(createUserDto);
    }
    findAll() {
        return this.userService.findAll();
    }
    async ifAdmin() {
        return await this.userService.ifadmin();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(updateUserDto) {
        return this.userService.update(updateUserDto.id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
    sendMail(mailDto) {
        return this.emailService.sendMail(mailDto.to, mailDto.message, "Subject");
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('login'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('createUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('createSuperAdmin'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createSuperAdmin", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('ifadmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ifAdmin", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('removeUser'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('sendMail'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mail_dto_1.MailDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendMail", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, mail_service_1.MailService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map