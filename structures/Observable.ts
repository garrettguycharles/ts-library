export class Observable {
    observers: Observer[] = [];
    notifyObservers() {
        for (const observer of this.observers) {
            if (observer.isListening()) {
                observer.onNotification();
            } else {
                // remove this observer
                this.observers = this.observers.filter(o => o !== observer);
            }
        }
    }

    observe(observer: Observer): Observer {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }

        return observer;
    }
}

export abstract class Observer {
    private isActive = true;

    abstract onNotification(): void;

    close(): void {
        this.isActive = false;
    }

    isListening(): boolean {
        return this.isActive;
    }
}