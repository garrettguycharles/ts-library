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

export class Sett<T> implements ISet<T> {
    set: Set<T>;

    constructor(items?: Iterable<T>) {
        this.set = new Set<T>(items);
    }

    add(t: T): boolean {
        let toReturn = !this.set.has(t);
        this.set.add(t);
        return toReturn;
    }

    intersection(other: ISet<T>): Sett<T> {
        let sharedItems: T[] = Array.from(this.set).filter(item => other.has(item));

        return new Sett<T>(sharedItems);
    }

    remove(t: T): boolean {
        return this.set.delete(t);
    }

    size(): number {
        return 0;
    }

    union(other: ISet<T>): Sett<T> {
        let toReturn = new Sett(this.set);

        for (let item of Array.from(other)) {
            toReturn.add(item);
        }

        return toReturn;
    }

    has(t: T): boolean {
        return this.set.has(t);
    }

    [Symbol.iterator](): Iterator<T> {
        return this.set[Symbol.iterator]();
    }
}

let set = new Sett([1, 3, 5, 7, 9]);
let set2 = new Sett([2, 4, 6, 8, 10]);

console.log(set.intersection(set2));