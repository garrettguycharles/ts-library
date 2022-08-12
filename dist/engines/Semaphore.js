"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semaphore = exports.SemaphoreFunctionCall = void 0;
const Tickable_1 = require("./Tickable");
const LinkedList_1 = require("../structures/LinkedList");
class SemaphoreFunctionCall {
    resolve;
    reject;
    fn;
    args;
    constructor(resolve, reject, fn, args) {
        this.resolve = resolve;
        this.reject = reject;
        this.fn = fn;
        this.args = args;
    }
}
exports.SemaphoreFunctionCall = SemaphoreFunctionCall;
class Semaphore extends Tickable_1.Tickable {
    limit;
    current = 0;
    requests = new LinkedList_1.LinkedList();
    constructor(limit = 1) {
        super();
        this.limit = limit;
    }
    call(fn, ...args) {
        return new Promise((resolve, reject) => {
            this.requests.pushTail(new SemaphoreFunctionCall(resolve, reject, fn, args));
            this.scheduleTick();
        });
    }
    onTick() {
        if (this.requests.size === 0) {
            return Promise.resolve();
        }
        else if (this.current < this.limit) {
            this.current += 1;
            let fnToCall = this.requests.popHead();
            fnToCall.fn(...fnToCall.args)
                .then((res) => fnToCall.resolve(res))
                .catch((err) => fnToCall.reject)
                .finally(() => {
                this.current -= 1;
                this.scheduleTick();
            });
        }
        return Promise.resolve();
    }
    shouldContinueTicking() {
        return this.requests.size > 0 && this.current < this.limit;
    }
}
exports.Semaphore = Semaphore;
