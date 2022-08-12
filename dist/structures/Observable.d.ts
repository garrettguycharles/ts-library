export declare class Observable {
    observers: Observer[];
    notifyObservers(): void;
    observe(observer: Observer): Observer;
}
export declare abstract class Observer {
    private isActive;
    abstract onNotification(): void;
    close(): void;
    isListening(): boolean;
}
//# sourceMappingURL=Observable.d.ts.map