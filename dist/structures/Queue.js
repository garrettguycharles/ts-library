"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedListQueue = exports.ArrayQueue = void 0;
const LinkedList_1 = require("./LinkedList");
class ArrayQueue {
    queue = [];
    push(t) {
        this.queue.unshift(t);
    }
    pop() {
        return this.queue.pop();
    }
    size() {
        return this.queue.length;
    }
}
exports.ArrayQueue = ArrayQueue;
class LinkedListQueue {
    queue = new LinkedList_1.LinkedList();
    pop() {
        return this.queue.popTail();
    }
    push(t) {
        this.queue.pushHead(t);
    }
    size() {
        return this.queue.size;
    }
}
exports.LinkedListQueue = LinkedListQueue;
