"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const fs_1 = require("fs");
class FileManager {
    has(path) {
        return new Promise((resolve, reject) => {
            (0, fs_1.stat)(path, (err, stats) => {
                if (err)
                    reject(err);
                resolve(stats.isFile());
            });
        });
    }
    async delete(path) {
        const exist = await this.has(path);
        if (exist)
            return (0, fs_1.unlink)(path, err => console.error(err));
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=FileManager.js.map