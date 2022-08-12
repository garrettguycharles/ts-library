/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
export declare const sleep: (ms: number) => Promise<void>;
export declare function modulo(n: number, mod: number): number;
export declare function clamp(lo: number, val: number, hi: number): number;
export declare const random_range: (lo: number, hi: number) => number;
export declare function random_choice<T>(t: T[]): T;
export declare function prettyFormatDate(date: Date): string;
/**
 * Returns all hashpaths within obj which resolve to a string value.
 * @param obj
 */
export declare function getAllStringBearingHashPaths(obj: {
    [key: string]: any;
}): string[];
export declare const getValueAtHashPath: (path: string, obj: any) => any | undefined;
export declare const setImmediate: (fn: () => any) => NodeJS.Timeout;
//# sourceMappingURL=functions.d.ts.map