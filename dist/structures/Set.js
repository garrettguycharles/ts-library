"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sett = void 0;
class Sett {
    set;
    constructor(items) {
        this.set = new Set(items);
    }
    add(t) {
        let toReturn = !this.set.has(t);
        this.set.add(t);
        return toReturn;
    }
    intersection(other) {
        let sharedItems = Array.from(other).filter(item => this.has(item));
        return new Sett(sharedItems);
    }
    remove(t) {
        return this.set.delete(t);
    }
    size() {
        return 0;
    }
    union(other) {
        let toReturn = new Sett(this.set);
        for (let item of Array.from(other)) {
            toReturn.add(item);
        }
        return toReturn;
    }
    has(t) {
        return this.set.has(t);
    }
    clear() {
        this.set.clear();
    }
    [Symbol.iterator]() {
        return this.set[Symbol.iterator]();
    }
}
exports.Sett = Sett;
