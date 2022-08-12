/// <reference types="node" />
import fs from "fs";
export interface ILogger {
    trace(message: string | Error): void;
    debug(message: string | Error): void;
    info(message: string | Error): void;
    warn(message: string | Error): void;
    error(message: string | Error): void;
    fatal(message: string | Error): void;
    close(): void;
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
    buildLogMessage(level: string, message: string, colorized?: boolean): string;
    formatTimestamp(timestamp: number): string;
    private getMessageFromLog;
    private colorizeLog;
    close(): void;
}
export declare class FileWriterLogger extends Logger {
    id: string;
    writePath: string;
    logWriteStream: fs.WriteStream;
    constructor(logOutputDir: string);
    log(level: string, message: string): void;
    close(): void;
}
//# sourceMappingURL=Logger.d.ts.map