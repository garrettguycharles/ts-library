export interface IStack<T> extends Iterable<T> {
    push(t: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}
export declare class Stack<T> implements IStack<T> {
    stack: T[];
    constructor(init?: Iterable<T>);
    peek(): T | undefined;
    pop(): T | undefined;
    push(t: T): void;
    size(): number;
    [Symbol.iterator](): Iterator<T>;
}
//# sourceMappingURL=Stack.d.ts.map