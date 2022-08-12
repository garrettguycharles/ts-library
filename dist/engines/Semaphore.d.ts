import { Tickable } from "./Tickable";
import { LinkedList } from "../structures/LinkedList";
export declare class SemaphoreFunctionCall {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    fn: (...args: any) => any;
    args: any[];
    constructor(resolve: (value: any) => void, reject: (reason?: any) => void, fn: (...args: any) => any, args: any[]);
}
export declare class Semaphore extends Tickable {
    limit: number;
    current: number;
    requests: LinkedList<SemaphoreFunctionCall>;
    constructor(limit?: number);
    call(fn: (...args: any) => Promise<any>, ...args: any[]): Promise<any>;
    protected onTick(): Promise<void>;
    protected shouldContinueTicking(): boolean;
}
//# sourceMappingURL=Semaphore.d.ts.map