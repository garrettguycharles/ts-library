/**
 * Custom error class which allows for
 * prefixing messages.
 *
 * (Helpful when logging or
 * determining HTTP response codes.)
 */
export abstract class PrefixedError extends Error {
    /**
     * Public constructor.
     * @param message description of the error.
     */
    constructor(message: string) {
        super();
        this.message = [this.getPrefix(), ": ", message].join("");
    }

    /**
     * Get the desired prefix for the error.
     * @returns a string containing the prefix for the error.
     */
    public abstract getPrefix(): string;

    /**
     * Get the HTTP response code associated with this error.
     */
    public abstract getResponseCode(): number;
}

export function isPrefixedError(e: any): e is PrefixedError {
    return typeof e.getPrefix === 'function'
        && typeof e.getResponseCode === 'function';
}