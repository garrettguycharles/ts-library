export declare class LinkedListNode<T> {
    value: T;
    previous: LinkedListNode<T> | undefined;
    next: LinkedListNode<T> | undefined;
    constructor(value: T);
    withPrevious(previous: LinkedListNode<T> | undefined): LinkedListNode<T>;
    withNext(next: LinkedListNode<T> | undefined): LinkedListNode<T>;
}
export declare class LinkedList<T> {
    head: LinkedListNode<T> | undefined;
    tail: LinkedListNode<T> | undefined;
    size: number;
    toString(): string;
    toStringReverse(): string;
    get(index: number): T | undefined;
    pushHead(value: T): LinkedListNode<T>;
    pushHeadNode(node: LinkedListNode<T>): LinkedListNode<T>;
    popHeadNode(): LinkedListNode<T> | undefined;
    pushTail(value: T): LinkedListNode<T>;
    pushTailNode(node: LinkedListNode<T>): LinkedListNode<T>;
    popTailNode(): LinkedListNode<T> | undefined;
    pluckNode(node: LinkedListNode<T>): LinkedListNode<T> | undefined;
    insertBeforeNode(node: LinkedListNode<T>, value: T): LinkedListNode<T>;
    insertAfterNode(node: LinkedListNode<T>, value: T): LinkedListNode<T>;
    popTail(): T | undefined;
    popHead(): T | undefined;
}
//# sourceMappingURL=LinkedList.d.ts.map