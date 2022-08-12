import {LinkedList, LinkedListNode} from "./LinkedList";
import {random_choice, random_range} from "../utils/functions";

export interface ICache<T> {
    write(key: string, item: T): T;
    read(key: string): T | undefined;
    kick(key: string): T | undefined;
}

class LRUCacheEntry<T> {
    key: string;
    item: T;

    constructor(key: string, value: T) {
        this.key = key;
        this.item = value;
    }
}

export class LRUCache<T> implements ICache<T> {
    list: LinkedList<LRUCacheEntry<T>> = new LinkedList<LRUCacheEntry<T>>();
    nodeMap: {[key: string]: LinkedListNode<LRUCacheEntry<T>>} = {};
    hits = 0;
    misses = 0;

    private capacity: number;

    constructor(capacity = 10) {
        this.capacity = capacity;
    }

    size(): number {
        return this.list.size;
    }

    kick(key: string): T | undefined {
        const node = this.nodeMap[key];
        if (node) {
            console.log(`Kicking key: ${key}`);
            this.list.pluckNode(node);
            delete this.nodeMap[key];
            return node.value.item;
        }

        return undefined;
    }

    read(key: string): T | undefined {
        const node = this.nodeMap[key];
        if (node) {
            console.log("Cache hit!");
            this.hits += 1;
            this.list.pluckNode(node);
            this.list.pushHeadNode(node);
            return node.value.item;
        }

        this.misses += 1;
        console.log("Cache miss");
        return undefined;
    }

    write(key: string, item: T): T {
        if (this.list.size === this.capacity) {
            const kicked = this.list.popTailNode() as LinkedListNode<LRUCacheEntry<T>>;
            console.log(`Kicking LRU: ${kicked.value.item}`);
            const keyToDel = kicked.value.key;

            delete this.nodeMap[keyToDel];
        }

        const newNode = this.list.pushHead(new LRUCacheEntry<T>(key, item));
        this.nodeMap[key] = newNode;

        return item;
    }

    toString(): string {
        let node = this.list.head;
        let toReturnArr: string[] = [];

        while (node !== undefined) {
            toReturnArr.push(node.value.key);
            node = node.next;
        }

        return toReturnArr.join(" -> ");
    }
}

let cache = new LRUCache<number>(100);

for (let i = 0; i < 30; i++) {
    if (!random_range(0, 5)) {
        cache.kick(random_choice(Object.keys(cache.nodeMap)));
    }

    cache.write(i.toString(), i);

    const toRead = random_range(0, i).toString()
    const didRead = cache.read(toRead);;

    if (didRead) {
        // @ts-ignore
        console.log(`Read ${toRead}. Cache head: ${cache.list.head.value.key}`);
    }

    console.log(cache.size());
    console.log(cache.toString());
}

console.log(cache.toString());
console.log(`Hits: ${cache.hits}, Misses: ${cache.misses}`);