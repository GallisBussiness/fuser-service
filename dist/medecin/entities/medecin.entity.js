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
exports.MedecinSchema = exports.Medecin = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Medecin = class Medecin {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, index: 'text' }),
    __metadata("design:type", String)
], Medecin.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Medecin.prototype, "speciality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "sexe", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: 'default_avatar.png' }),
    __metadata("design:type", String)
], Medecin.prototype, "profile_image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Medecin.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "adresse", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "ville", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "abonnement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Medecin.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Medecin.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array }),
    __metadata("design:type", Array)
], Medecin.prototype, "variables", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 50 }),
    __metadata("design:type", Number)
], Medecin.prototype, "sms_account", void 0);
Medecin = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Medecin);
exports.Medecin = Medecin;
exports.MedecinSchema = mongoose_1.SchemaFactory.createForClass(Medecin);
//# sourceMappingURL=medecin.entity.js.map