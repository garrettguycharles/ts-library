export declare abstract class Tickable {
    private scheduled_tick;
    private tick_delay;
    constructor();
    protected abstract onTick(): Promise<void> | void;
    protected abstract shouldContinueTicking(): boolean;
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