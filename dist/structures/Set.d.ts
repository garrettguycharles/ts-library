export interface ISet<T> extends Iterable<T> {
    /**
     * Adds an item (t) to the set.
     *
     * @param t
     * @returns true if t added to set, false if t already present in set
     */
    add(t: T): boolean;
    /**
     * Removes the item from the set.
     * @param t
     * @returns true if item removed, false if item was not present in the set.
     */
    remove(t: T): boolean;
    size(): number;
    /**
     * Returns a new set containing only the elements present in this AND other.
     * @param other
     */
    intersection(other: ISet<T>): ISet<T>;
    /**
     * Returns a new set containing all elements from this and other combined.
     * @param other
     */
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