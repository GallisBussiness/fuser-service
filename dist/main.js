"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const Options = {
    transport: microservices_1.Transport.TCP,
    options: {
        host: 'localhost',
        port: 1000,
    },
};
const logger = new common_1.Logger('Main');
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, Options);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: process.env.NODE_ENV === 'production',
    }));
    app.listen().then(() => logger.log('userService is listen on port : 1000'));
}
bootstrap();
//# sourceMappingURL=main.js.map