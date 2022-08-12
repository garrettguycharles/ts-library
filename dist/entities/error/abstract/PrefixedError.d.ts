/**
 * Custom error class which allows for
 * prefixing messages.
 *
 * (Helpful when logging or
 * determining HTTP response codes.)
 */
export declare abstract class PrefixedError extends Error {
    /**
     * Public constructor.
     * @param message description of the error.
     */
    constructor(message: string);
    /**
     * Get the desired prefix for the error.
     * @returns a string containing the prefix for the error.
     */
    abstract getPrefix(): string;
    /**
     * Get the HTTP response code associated with this error.
     */
    abstract getResponseCode(): number;
}
export declare function isPrefixedError(e: any): e is PrefixedError;
//# sourceMappingURL=PrefixedError.d.ts.map