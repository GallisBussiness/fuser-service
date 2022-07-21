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
exports.CreateUserDto = exports.ROLES = exports.STATUS_USER = exports.TYPE_USER = void 0;
const class_validator_1 = require("class-validator");
var TYPE_USER;
(function (TYPE_USER) {
    TYPE_USER["MEDECIN"] = "MEDECIN";
    TYPE_USER["PATIENT"] = "PATIENT";
    TYPE_USER["SUPER_ADMIN"] = "SUPER_ADMIN";
    TYPE_USER["ADMIN"] = "ADMIN";
})(TYPE_USER = exports.TYPE_USER || (exports.TYPE_USER = {}));
var STATUS_USER;
(function (STATUS_USER) {
    STATUS_USER["ACTIVATE"] = "ACTIVATE";
    STATUS_USER["DISABLED"] = "DISABLED";
})(STATUS_USER = exports.STATUS_USER || (exports.STATUS_USER = {}));
var ROLES;
(function (ROLES) {
    ROLES["SUPER_ADMIN"] = "SUPER_ADMIN";
    ROLES["ADMIN"] = "ADMIN";
    ROLES["SECRETAIRE"] = "SECRETAIRE";
    ROLES["USER"] = "USER";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TYPE_USER, { each: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "type_user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "verification_code", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(STATUS_USER, { each: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ROLES, { each: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isGoogle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isFacebook", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map