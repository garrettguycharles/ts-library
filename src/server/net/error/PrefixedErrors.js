"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.UnauthenticatedError = exports.InsufficientPrivilegesError = exports.BadRequestError = void 0;
const PrefixedError_1 = require("./abstract/PrefixedError");
class BadRequestError extends PrefixedError_1.PrefixedError {
    getPrefix() {
        return "[BAD REQUEST]";
    }
    getResponseCode() {
        return 400;
    }
}
exports.BadRequestError = BadRequestError;
class InsufficientPrivilegesError extends PrefixedError_1.PrefixedError {
    getPrefix() {
        return "[INSUFFICIENT PRIVILEGES]";
    }
    getResponseCode() {
        return 403;
    }
}
exports.InsufficientPrivilegesError = InsufficientPrivilegesError;
class UnauthenticatedError extends PrefixedError_1.PrefixedError {
    getPrefix() {
        return "[UNAUTHENTICATED]";
    }
    getResponseCode() {
        return 401;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class InternalServerError extends PrefixedError_1.PrefixedError {
    getPrefix() {
        return "[INTERNAL SERVER ERROR]";
    }
    getResponseCode() {
        return 500;
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=PrefixedErrors.js.map