import { PrefixedError } from "./abstract/PrefixedError";
export declare class BadRequestError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
/**
 * Send this when the client is signed-in, but
 * lacks permissions required for this resource
 */
export declare class InsufficientPrivilegesError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
/**
 * Send this when you want the client to sign-in
 * (or sign-in again).
 */
export declare class UnauthenticatedError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
export declare class InternalServerError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
//# sourceMappingURL=PrefixedErrors.d.ts.map