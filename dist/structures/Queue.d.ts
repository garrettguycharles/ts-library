import { LinkedList } from "./LinkedList";
interface IQueue<T> {
    push(t: T): void;
    pop(): T | undefined;
    size(): number;
}
export declare class ArrayQueue<T> implements IQueue<T> {
    queue: T[];
    push(t: T): void;
    pop(): T | undefined;
    size(): number;
}
export declare class LinkedListQueue<T> implements IQueue<T> {
    queue: LinkedList<T>;
    pop(): T | undefined;
    push(t: T): void;
    size(): number;
}
export {};
//# sourceMappingURL=Queue.d.ts.map