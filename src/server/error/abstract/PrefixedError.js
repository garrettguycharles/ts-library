"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrefixedError = exports.PrefixedError = void 0;
class PrefixedError extends Error {
    constructor(message) {
        super();
        this.message = [this.getPrefix(), ": ", message].join("");
    }
}
exports.PrefixedError = PrefixedError;
function isPrefixedError(e) {
    return typeof e.getPrefix === 'function'
        && typeof e.getResponseCode === 'function';
}
exports.isPrefixedError = isPrefixedError;
//# sourceMappingURL=PrefixedError.js.map