export declare abstract class PrefixedError extends Error {
    constructor(message: string);
    abstract getPrefix(): string;
    abstract getResponseCode(): number;
}
export declare function isPrefixedError(e: any): e is PrefixedError;
//# sourceMappingURL=PrefixedError.d.ts.map