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
/**
 * Send this when the client is signed-in, but
 * lacks permissions required for this resource
 */
class InsufficientPrivilegesError extends PrefixedError_1.PrefixedError {
    getPrefix() {
        return "[INSUFFICIENT PRIVILEGES]";
    }
    getResponseCode() {
        return 403;
    }
}
exports.InsufficientPrivilegesError = InsufficientPrivilegesError;
/**
 * Send this when you want the client to sign-in
 * (or sign-in again).
 */
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
