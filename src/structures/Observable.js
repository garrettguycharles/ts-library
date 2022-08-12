"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = exports.Observable = void 0;
class Observable {
    observers = [];
    notifyObservers() {
        for (const observer of this.observers) {
            if (observer.isListening()) {
                observer.onNotification();
            }
            else {
                this.observers = this.observers.filter(o => o !== observer);
            }
        }
    }
    observe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
        return observer;
    }
}
exports.Observable = Observable;
class Observer {
    isActive = true;
    close() {
        this.isActive = false;
    }
    isListening() {
        return this.isActive;
    }
}
exports.Observer = Observer;
//# sourceMappingURL=Observable.js.map