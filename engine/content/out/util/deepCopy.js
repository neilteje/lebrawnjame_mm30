"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => deepCopy(item));
    }
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key]);
        }
    }
    return result;
}
exports.default = deepCopy;
//# sourceMappingURL=deepCopy.js.map