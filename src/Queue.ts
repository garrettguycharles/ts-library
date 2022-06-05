import {LinkedList} from "./LinkedList";

interface IQueue<T> {
    push(t: T): void;

    pop(): T | undefined;

    size(): number;
}

export class ArrayQueue<T> implements IQueue<T> {
    queue: T[] = [];

    push(t: T): void {
        this.queue.unshift(t);
    }

    pop(): T | undefined {
        return this.queue.pop();
    }

    size(): number {
        return this.queue.length;
    }
}

export class LinkedListQueue<T> implements IQueue<T> {
    queue: LinkedList<T> = new LinkedList<T>();

    pop(): T | undefined {
        return this.queue.popTail();
    }

    push(t: T): void {
        this.queue.pushHead(t);
    }

    size(): number {
        return this.queue.size;
    }
}