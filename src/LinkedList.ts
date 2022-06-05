export class LinkedListNode<T> {
    value: T;
    previous: LinkedListNode<T> | undefined = undefined;
    next: LinkedListNode<T> | undefined = undefined;

    constructor(value: T) {
        this.value = value;
    }

    withPrevious(previous: LinkedListNode<T> | undefined): LinkedListNode<T> {
        this.previous = previous;
        return this;
    }

    withNext(next: LinkedListNode<T> | undefined): LinkedListNode<T> {
        this.next = next;
        return this;
    }
}

export class LinkedList<T> {
    head: LinkedListNode<T> | undefined = undefined;
    tail: LinkedListNode<T> | undefined = undefined;
    size = 0;

    toString(): string {
        let node = this.head;
        let toReturnArr: string[] = [];

        while (node !== undefined) {
            toReturnArr.push(String(node.value));
            node = node.next;
        }

        return toReturnArr.join(" -> ");
    }

    toStringReverse(): string {
        let node = this.tail;
        let toReturnArr: string[] = [];

        while (node !== undefined) {
            toReturnArr.push(String(node.value));
            node = node.previous;
        }

        return toReturnArr.reverse().join(" <- ");
    }

    get(index: number): T | undefined {
        if (index >= this.size) {
            return undefined;
        }

        let node = this.head as LinkedListNode<T>;
        for (let i = 0; i < index; i++) {
            node = node.next as LinkedListNode<T>;
        }

        return node.value;
    }

    pushHead(value: T): LinkedListNode<T> {
        return this.pushHeadNode(new LinkedListNode<T>(value));
    }
    pushHeadNode(node: LinkedListNode<T>): LinkedListNode<T> {
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
    popHeadNode(): LinkedListNode<T> | undefined {
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

    pushTail(value: T): LinkedListNode<T> {
        return this.pushTailNode(new LinkedListNode<T>(value));
    }
    pushTailNode(node: LinkedListNode<T>): LinkedListNode<T> {
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
    popTailNode(): LinkedListNode<T> | undefined {
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

    pluckNode(node: LinkedListNode<T>): LinkedListNode<T> | undefined {
        const previous = node.previous;
        const next = node.next;

        if (previous && next) {
            previous.next = next;
            next.previous = previous;
        } else if (previous && (next === undefined)) {
            if (node === this.tail) {
                return this.popTailNode();
            } else {
                throw new Error(`Tried to pluck a node whose 'next' is undefined but was not this list's tail node.`);
            }

        } else if (next && (previous === undefined)) {
            if (node === this.head) {
                return this.popHeadNode();
            } else {
                throw new Error(`Tried to pluck a node whose 'previous' is undefined but was not this list's head node.`);
            }
        } else {
            if (node === this.head && node === this.tail) {
                return this.popHeadNode();
            }
        }

        node.next = undefined;
        node.previous = undefined;
        this.size -= 1;
        return node;
    }

    insertBeforeNode(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
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
        } else { // if ((previous === undefined) && next) {
            return this.pushHead(value);
        }
    }
    insertAfterNode(node: LinkedListNode<T>, value: T): LinkedListNode<T> {
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
        } else { // if (previous && (next === undefined)) {
            return this.pushTail(value);
        }
    }

    popTail(): T | undefined {
        return this.popTailNode()?.value || undefined;
    }

    popHead(): T | undefined {
        return this.popHeadNode()?.value || undefined;
    }
}

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

