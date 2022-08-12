"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    stack = [];
    constructor(init = []) {
        this.stack = Array.from(init);
    }
    peek() {
        if (this.stack.length) {
            return this.stack[this.stack.length - 1];
        }
        return undefined;
    }
    pop() {
        if (this.stack.length) {
            return this.stack.pop();
        }
        return undefined;
    }
    push(t) {
        this.stack.push(t);
    }
    size() {
        return this.stack.length;
    }
    [Symbol.iterator]() {
        return this.stack[Symbol.iterator]();
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map