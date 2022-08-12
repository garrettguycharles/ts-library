"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriterLogger = exports.Logger = void 0;
const colors_1 = __importDefault(require("colors"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const PathUtils_1 = require("../utils/PathUtils");
class Logger {
    levels = {
        trace: "TRACE",
        debug: "DEBUG",
        info: "INFO",
        warn: "WARN",
        error: "ERROR",
        fatal: "FATAL"
    };
    trace(message) {
        this.log(this.levels.trace, this.getMessageFromLog(message));
    }
    debug(message) {
        this.log(this.levels.debug, this.getMessageFromLog(message));
    }
    info(message) {
        this.log(this.levels.info, this.getMessageFromLog(message));
    }
    warn(message) {
        this.log(this.levels.warn, this.getMessageFromLog(message));
    }
    error(message) {
        this.log(this.levels.error, this.getMessageFromLog(message));
    }
    fatal(message) {
        this.log(this.levels.fatal, this.getMessageFromLog(message));
    }
    log(level, message) {
        console.log(this.buildLogMessage(level, message));
    }
    buildLogMessage(level, message, colorized = true) {
        const nowPrettyPrinted = this.formatTimestamp(Date.now());
        if (colorized) {
            const { level: tag, message: body } = this.colorizeLog(level, message);
            return `${tag} [${colors_1.default.dim(nowPrettyPrinted)}]: ${body}\n`;
        }
        return `[${level}\t(${nowPrettyPrinted})]: ${message}\n`;
    }
    formatTimestamp(timestamp) {
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
    getMessageFromLog(message) {
        if (typeof message === "string") {
            return message;
        }
        else {
            // message is error
            return `${message.message}:\nStack Trace: ${message.stack}`;
        }
    }
    colorizeLog(level, message) {
        const l = level.trim().toLowerCase();
        let tag = "";
        let body = "";
        switch (l) {
            case 'trace':
                tag = colors_1.default.bgWhite(` ${level} `);
                body = message;
                break;
            case 'debug':
                tag = colors_1.default.bgBlue(` ${level} `);
                body = colors_1.default.blue(message);
                break;
            case 'info':
                tag = colors_1.default.bgGreen(` ${level} `);
                body = colors_1.default.green(message);
                break;
            case "warn":
                tag = colors_1.default.bgYellow(` ${level} `);
                body = colors_1.default.yellow(message);
                break;
            case "error":
                tag = colors_1.default.bgRed(` ${level} `);
                body = colors_1.default.red(message);
                break;
            case "fatal":
                const redSpace = colors_1.default.bgRed(" ");
                const pad = Array(3).fill(redSpace).join(" ");
                tag = `${pad}${colors_1.default.bgRed(`FATAL`)}${pad}`;
                body = colors_1.default.red(message);
                break;
            default:
                tag = level;
                body = message;
                break;
        }
        return { level: tag, message: body };
    }
    close() { }
}
exports.Logger = Logger;
class FileWriterLogger extends Logger {
    id;
    writePath;
    logWriteStream;
    constructor(logOutputDir) {
        super();
        this.id = (0, uuid_1.v4)();
        this.writePath = PathUtils_1.PathUtils.resolve(PathUtils_1.PathUtils.join(logOutputDir, "log", this.id + ".txt"));
        fs_1.default.mkdirSync(PathUtils_1.PathUtils.getPathWithoutLeaf(this.writePath), { recursive: true });
        this.logWriteStream = fs_1.default.createWriteStream(this.writePath);
    }
    log(level, message) {
        const log = this.buildLogMessage(level, message);
        this.logWriteStream.write(log + "\n");
    }
    close() {
        this.logWriteStream.close();
    }
}
exports.FileWriterLogger = FileWriterLogger;
