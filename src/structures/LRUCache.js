"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
const LinkedList_1 = require("./LinkedList");
class LRUCacheEntry {
    key;
    item;
    constructor(key, value) {
        this.key = key;
        this.item = value;
    }
}
class LRUCache {
    list = new LinkedList_1.LinkedList();
    nodeMap = {};
    hits = 0;
    misses = 0;
    capacity;
    constructor(capacity = 10) {
        this.capacity = capacity;
    }
    size() {
        return this.list.size;
    }
    kick(key) {
        const node = this.nodeMap[key];
        if (node) {
            console.log(`Kicking key: ${key}`);
            this.list.pluckNode(node);
            delete this.nodeMap[key];
            return node.value.item;
        }
        return undefined;
    }
    read(key) {
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
    write(key, item) {
        if (this.list.size === this.capacity) {
            const kicked = this.list.popTailNode();
            console.log(`Kicking LRU: ${kicked.value.item}`);
            const keyToDel = kicked.value.key;
            delete this.nodeMap[keyToDel];
        }
        const newNode = this.list.pushHead(new LRUCacheEntry(key, item));
        this.nodeMap[key] = newNode;
        return item;
    }
    toString() {
        let node = this.list.head;
        let toReturnArr = [];
        while (node !== undefined) {
            toReturnArr.push(node.value.key);
            node = node.next;
        }
        return toReturnArr.join(" -> ");
    }
}
exports.LRUCache = LRUCache;
//# sourceMappingURL=LRUCache.js.map