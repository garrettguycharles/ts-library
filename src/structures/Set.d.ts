export interface ISet<T> extends Iterable<T> {
    add(t: T): boolean;
    remove(t: T): boolean;
    size(): number;
    intersection(other: ISet<T>): ISet<T>;
    union(other: ISet<T>): ISet<T>;
    has(t: T): boolean;
}
export declare class Sett<T> implements ISet<T> {
    set: Set<T>;
    constructor(items?: Iterable<T>);
    add(t: T): boolean;
    intersection<C extends Iterable<T>>(other: C): Sett<T>;
    remove(t: T): boolean;
    size(): number;
    union<C extends Iterable<T>>(other: C): Sett<T>;
    has(t: T): boolean;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=Set.d.ts.map