import { LinkedList, LinkedListNode } from "./LinkedList";
export interface ICache<T> {
    write(key: string, item: T): T;
    read(key: string): T | undefined;
    kick(key: string): T | undefined;
}
declare class LRUCacheEntry<T> {
    key: string;
    item: T;
    constructor(key: string, value: T);
}
export declare class LRUCache<T> implements ICache<T> {
    list: LinkedList<LRUCacheEntry<T>>;
    nodeMap: {
        [key: string]: LinkedListNode<LRUCacheEntry<T>>;
    };
    hits: number;
    misses: number;
    private capacity;
    constructor(capacity?: number);
    size(): number;
    kick(key: string): T | undefined;
    read(key: string): T | undefined;
    write(key: string, item: T): T;
    toString(): string;
}
export {};
//# sourceMappingURL=LRUCache.d.ts.map