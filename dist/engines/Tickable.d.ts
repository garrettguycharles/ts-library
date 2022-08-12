export declare abstract class Tickable {
    private scheduled_tick;
    private tick_delay;
    constructor();
    /**
     * Implement this with whatever functionality
     * you want to run every tick.
     * @protected
     */
    protected abstract onTick(): Promise<void> | void;
    /**
     * Return whether to schedule another tick
     * immediately following the current tick.
     *
     * @protected
     */
    protected abstract shouldContinueTicking(): boolean;
    /**
     * Set the tick delay. Each tick will wait this long
     * before continuing.
     *
     * @param ms
     */
    setTickDelay(ms: number): void;
    tick(): Promise<void>;
    scheduleTick(): void;
}
export declare class TestableTickableSpy extends Tickable {
    invocations: {
        [key: string]: number;
    };
    protected onTick(): Promise<void>;
    protected shouldContinueTicking(): boolean;
    tick(): Promise<void>;
    scheduleTick(): void;
}
//# sourceMappingURL=Tickable.d.ts.map