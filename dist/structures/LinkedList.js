"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = exports.LinkedListNode = void 0;
class LinkedListNode {
    value;
    previous = undefined;
    next = undefined;
    constructor(value) {
        this.value = value;
    }
    withPrevious(previous) {
        this.previous = previous;
        return this;
    }
    withNext(next) {
        this.next = next;
        return this;
    }
}
exports.LinkedListNode = LinkedListNode;
class LinkedList {
    head = undefined;
    tail = undefined;
    size = 0;
    toString() {
        let node = this.head;
        let toReturnArr = [];
        while (node !== undefined) {
            toReturnArr.push(String(node.value));
            node = node.next;
        }
        return toReturnArr.join(" -> ");
    }
    toStringReverse() {
        let node = this.tail;
        let toReturnArr = [];
        while (node !== undefined) {
            toReturnArr.push(String(node.value));
            node = node.previous;
        }
        return toReturnArr.reverse().join(" <- ");
    }
    get(index) {
        if (index >= this.size) {
            return undefined;
        }
        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node.value;
    }
    pushHead(value) {
        return this.pushHeadNode(new LinkedListNode(value));
    }
    pushHeadNode(node) {
        node.withNext(this.head).withPrevious(undefined);
        if (this.head) {
            this.head.previous = node;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.size += 1;
        return node;
    }
    popHeadNode() {
        if (this.head === undefined) {
            return undefined;
        }
        const nodeToReturn = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.previous = undefined;
        }
        nodeToReturn.next = undefined;
        this.size -= 1;
        if (this.size == 0) {
            if (this.tail) {
                this.tail.previous = undefined;
                this.tail.next = undefined;
                this.tail = undefined;
            }
        }
        return nodeToReturn;
    }
    pushTail(value) {
        return this.pushTailNode(new LinkedListNode(value));
    }
    pushTailNode(node) {
        node.withPrevious(this.tail).withNext(undefined);
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
        this.size += 1;
        return node;
    }
    popTailNode() {
        if (this.tail === undefined) {
            return undefined;
        }
        const nodeToReturn = this.tail;
        this.tail = this.tail.previous;
        if (this.tail) {
            this.tail.next = undefined;
        }
        nodeToReturn.previous = undefined;
        this.size -= 1;
        if (this.size === 0) {
            if (this.head) {
                this.head.previous = undefined;
                this.head.next = undefined;
                this.head = undefined;
            }
        }
        return nodeToReturn;
    }
    pluckNode(node) {
        const previous = node.previous;
        const next = node.next;
        if (previous && next) {
            previous.next = next;
            next.previous = previous;
        }
        else if (previous && (next === undefined)) {
            if (node === this.tail) {
                return this.popTailNode();
            }
            else {
                throw new Error(`Tried to pluck a node whose 'next' is undefined but was not this list's tail node.`);
            }
        }
        else if (next && (previous === undefined)) {
            if (node === this.head) {
                return this.popHeadNode();
            }
            else {
                throw new Error(`Tried to pluck a node whose 'previous' is undefined but was not this list's head node.`);
            }
        }
        else {
            if (node === this.head && node === this.tail) {
                return this.popHeadNode();
            }
        }
        node.next = undefined;
        node.previous = undefined;
        this.size -= 1;
        return node;
    }
    insertBeforeNode(node, value) {
        const previous = node.previous;
        const next = node;
        if (previous && next) {
            const newNode = new LinkedListNode(value);
            previous.next = newNode;
            next.previous = newNode;
            newNode.previous = previous;
            newNode.next = next;
            this.size += 1;
            return newNode;
        }
        else { // if ((previous === undefined) && next) {
            return this.pushHead(value);
        }
    }
    insertAfterNode(node, value) {
        const previous = node;
        const next = node.next;
        if (previous && next) {
            const newNode = new LinkedListNode(value);
            previous.next = newNode;
            next.previous = newNode;
            newNode.previous = previous;
            newNode.next = next;
            this.size += 1;
            return newNode;
        }
        else { // if (previous && (next === undefined)) {
            return this.pushTail(value);
        }
    }
    popTail() {
        return this.popTailNode()?.value || undefined;
    }
    popHead() {
        return this.popHeadNode()?.value || undefined;
    }
}
exports.LinkedList = LinkedList;
// const list = new LinkedList<number>();
// list.pushHead(3);
// const two = list.pushHead(2);
// const one = list.pushHead(1);
// list.pushHead(0);
// list.pushTail(4);
//
// list.pluckNode(two);
// list.insertAfterNode(one, 2);
//
// console.log(list.tail?.value);
// console.log(list.head?.value);
// console.log(list.toString());
// console.log(list.toStringReverse());
