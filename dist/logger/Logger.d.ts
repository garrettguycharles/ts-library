export interface ILogger {
    trace(message: string | Error): void;
    debug(message: string | Error): void;
    info(message: string | Error): void;
    warn(message: string | Error): void;
    error(message: string | Error): void;
    fatal(message: string | Error): void;
}
export declare class Logger implements ILogger {
    levels: {
        trace: string;
        debug: string;
        info: string;
        warn: string;
        error: string;
        fatal: string;
    };
    trace(message: string | Error): void;
    debug(message: string | Error): void;
    info(message: string | Error): void;
    warn(message: string | Error): void;
    error(message: string | Error): void;
    fatal(message: string | Error): void;
    log(level: string, message: string): void;
    buildLogMessage(level: string, message: string): string;
    formatTimestamp(timestamp: number): string;
    private getMessageFromLog;
    private colorizeLog;
}
export declare const log: Logger;
//# sourceMappingURL=Logger.d.ts.map