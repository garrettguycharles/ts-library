import {PrefixedError} from "./abstract/PrefixedError";

export class BadRequestError extends PrefixedError {
    getPrefix(): string {
        return "[BAD REQUEST]";
    }

    getResponseCode(): number {
        return 400;
    }
}

/**
 * Send this when the client is signed-in, but
 * lacks permissions required for this resource
 */
export class InsufficientPrivilegesError extends PrefixedError {
    getPrefix(): string {
        return "[INSUFFICIENT PRIVILEGES]";
    }

    getResponseCode(): number {
        return 403;
    }
}

/**
 * Send this when you want the client to sign-in
 * (or sign-in again).
 */
export class UnauthenticatedError extends PrefixedError {
    getPrefix(): string {
        return "[UNAUTHENTICATED]";
    }

    getResponseCode(): number {
        return 401;
    }
}

export class InternalServerError extends PrefixedError {
    getPrefix(): string {
        return "[INTERNAL SERVER ERROR]";
    }

    getResponseCode(): number {
        return 500;
    }
}