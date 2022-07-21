"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRanNumber = void 0;
const genRanNumber = function (length) {
    if (isNaN(length)) {
        throw new TypeError('Length must be a number');
    }
    if (length < 1) {
        throw new RangeError('Length must be at least 1');
    }
    const possible = '0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str.padEnd(6, '0');
};
exports.genRanNumber = genRanNumber;
//# sourceMappingURL=Helpers.js.map