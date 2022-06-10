export interface IStack<T> extends Iterable<T> {
    push(t: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    stack: T[] = [];

    peek(): T | undefined {
        if (this.stack.length) {
            return this.stack[this.stack.length - 1];
        }

        return undefined;
    }

    pop(): T | undefined {
        if (this.stack.length) {
            return this.stack.pop();
        }

        return undefined;
    }

    push(t: T): void {
        this.stack.push(t);
    }

    size(): number {
        return this.stack.length;
    }

    [Symbol.iterator](): Iterator<T> {
        return this.stack[Symbol.iterator]();
    }
}