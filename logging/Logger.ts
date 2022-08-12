import colors from 'colors';
import fs from "fs";
import {v4} from "uuid";
import {PathUtils} from "../utils/PathUtils";

export interface ILogger {
    trace(message: string | Error): void;
    debug(message: string | Error): void;
    info(message: string | Error): void;
    warn(message: string | Error): void;
    error(message: string | Error): void;
    fatal(message: string | Error): void;

    close(): void;
}

export class Logger implements ILogger {
    levels = {
        trace: "TRACE",
        debug: "DEBUG",
        info: "INFO",
        warn: "WARN",
        error: "ERROR",
        fatal: "FATAL"
    }

    trace(message: string | Error): void {
        this.log(this.levels.trace, this.getMessageFromLog(message));
    }

    debug(message: string | Error): void {
        this.log(this.levels.debug, this.getMessageFromLog(message));
    }

    info(message: string | Error): void {
        this.log(this.levels.info, this.getMessageFromLog(message))
    }

    warn(message: string | Error): void {
        this.log(this.levels.warn, this.getMessageFromLog(message));
    }

    error(message: string | Error): void {
        this.log(this.levels.error, this.getMessageFromLog(message));
    }

    fatal(message: string | Error): void {
        this.log(this.levels.fatal, this.getMessageFromLog(message));
    }

    log(level: string, message: string): void {
        console.log(this.buildLogMessage(level, message));
    }

    buildLogMessage(level: string, message: string, colorized = true): string {
        const nowPrettyPrinted = this.formatTimestamp(Date.now());

        if (colorized) {
            const {level: tag, message: body} = this.colorizeLog(level, message);

            return `${tag} [${colors.dim(nowPrettyPrinted)}]: ${body}\n`;
        }

        return `[${level}\t(${nowPrettyPrinted})]: ${message}\n`;
    }

    formatTimestamp(timestamp: number): string {
        return new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            // @ts-ignore
            fractionalSecondDigits: 3
        });
    }

    private getMessageFromLog(message: string | Error): string {
        if (typeof message === "string") {
            return message;
        } else {
            // message is error
            return `${message.message}:\nStack Trace: ${message.stack}`;
        }
    }

    private colorizeLog(level: string, message: string): {level: string, message: string} {
        const l = level.trim().toLowerCase();

        let tag = "";
        let body = "";

        switch (l) {
            case 'trace':
                tag = colors.bgWhite(` ${level} `);
                body = message;
                break;
            case 'debug':
                tag = colors.bgBlue(` ${level} `);
                body = colors.blue(message);
                break;
            case 'info':
                tag = colors.bgGreen(` ${level} `);
                body = colors.green(message);
                break;
            case "warn":
                tag = colors.bgYellow(` ${level} `);
                body = colors.yellow(message);
                break;
            case "error":
                tag = colors.bgRed(` ${level} `);
                body = colors.red(message);
                break;
            case "fatal":
                const redSpace = colors.bgRed(" ");
                const pad = Array(3).fill(redSpace).join(" ");
                tag = `${pad}${colors.bgRed(`FATAL`)}${pad}`;
                body = colors.red(message);
                break;
            default:
                tag = level;
                body = message;
                break;
        }

        return {level: tag, message: body};
    }

    close(): void {}
}

export class FileWriterLogger extends Logger {
    id: string;
    writePath: string;
    logWriteStream: fs.WriteStream;

    constructor(logOutputDir: string) {
        super();
        this.id = v4();
        this.writePath = PathUtils.resolve(PathUtils.join(logOutputDir, "log", this.id + ".txt"));
        fs.mkdirSync(PathUtils.getPathWithoutLeaf(this.writePath), {recursive: true});
        this.logWriteStream = fs.createWriteStream(this.writePath);
    }

    log(level: string, message: string) {
        const log = this.buildLogMessage(level, message);

        this.logWriteStream.write(log + "\n");
    }

    close(): void {
        this.logWriteStream.close();
    }
}