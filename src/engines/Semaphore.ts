import {Tickable} from "./Tickable";
import {LinkedList} from "../structures/LinkedList";
import {sleep} from "../utils/functions";

export class SemaphoreFunctionCall {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    fn: (...args: any) => any;
    args: any[];

    constructor(resolve: (value: any) => void, reject: (reason?: any) => void, fn: (...args: any) => any, args: any[]) {
        this.resolve = resolve;
        this.reject = reject;
        this.fn = fn;
        this.args = args;
    }
}

export class Semaphore extends Tickable {
    limit: number;

    current = 0;

    requests: LinkedList<SemaphoreFunctionCall> = new LinkedList<SemaphoreFunctionCall>();

    constructor(limit = 1) {
        super();
        this.limit = limit;
    }

    call(fn: (...args: any) => Promise<any>, ...args: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.requests.pushTail(
                new SemaphoreFunctionCall(resolve, reject, fn, args)
            );

            this.scheduleTick();
        });
    }

    protected onTick(): Promise<void> {
        if (this.requests.size === 0) {
            return Promise.resolve();
        } else if (this.current < this.limit) {
            this.current += 1;
            let fnToCall = this.requests.popHead() as SemaphoreFunctionCall;
            fnToCall.fn(...fnToCall.args)
                .then((res: any) => fnToCall.resolve(res))
                .catch((err: any) => fnToCall.reject)
                .finally(() => {
                    this.current -= 1;
                    this.scheduleTick();
                });
        }

        return Promise.resolve();
    }

    protected shouldContinueTicking(): boolean {
        return this.requests.size > 0 && this.current < this.limit;
    }
}