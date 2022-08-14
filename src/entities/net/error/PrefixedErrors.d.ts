import { PrefixedError } from "./abstract/PrefixedError";
export declare class BadRequestError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
export declare class InsufficientPrivilegesError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
export declare class UnauthenticatedError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
export declare class InternalServerError extends PrefixedError {
    getPrefix(): string;
    getResponseCode(): number;
}
//# sourceMappingURL=PrefixedErrors.d.ts.map