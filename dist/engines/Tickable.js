"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestableTickableSpy = exports.Tickable = void 0;
const functions_1 = require("../utils/functions");
class Tickable {
    scheduled_tick;
    tick_delay = 0;
    constructor() {
        (0, functions_1.setImmediate)(this.scheduleTick.bind(this));
    }
    /**
     * Set the tick delay. Each tick will wait this long
     * before continuing.
     *
     * @param ms
     */
    setTickDelay(ms) {
        this.tick_delay = ms;
    }
    async tick() {
        await (0, functions_1.sleep)(this.tick_delay);
        try {
            await this.onTick();
        }
        catch (e) {
            console.error(`Threw error in tick():`, e);
        }
        this.scheduled_tick = undefined;
        if (this.shouldContinueTicking()) {
            this.scheduleTick();
        }
    }
    scheduleTick() {
        if (!this.scheduled_tick) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            this.scheduled_tick = (0, functions_1.setImmediate)(this.tick.bind(this));
        }
    }
}
exports.Tickable = Tickable;
class TestableTickableSpy extends Tickable {
    invocations = {
        tick: 0,
        schedule_tick: 0,
        shouldContinueTicking: 0,
        onTick: 0
    };
    onTick() {
        this.invocations.onTick += 1;
        return Promise.resolve(undefined);
    }
    shouldContinueTicking() {
        this.invocations.shouldContinueTicking += 1;
        return false;
    }
    async tick() {
        this.invocations.tick += 1;
        super.tick();
        return Promise.resolve();
    }
    scheduleTick() {
        this.invocations.schedule_tick += 1;
        super.scheduleTick();
    }
}
exports.TestableTickableSpy = TestableTickableSpy;
