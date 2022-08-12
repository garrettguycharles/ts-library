"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrefixedError = exports.PrefixedError = void 0;
/**
 * Custom error class which allows for
 * prefixing messages.
 *
 * (Helpful when logging or
 * determining HTTP response codes.)
 */
class PrefixedError extends Error {
    /**
     * Public constructor.
     * @param message description of the error.
     */
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
