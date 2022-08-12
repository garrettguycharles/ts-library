"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Logger = void 0;
const colors_1 = __importDefault(require("colors"));
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
    buildLogMessage(level, message) {
        const nowPrettyPrinted = this.formatTimestamp(Date.now());
        const { level: tag, message: body } = this.colorizeLog(level, message);
        return `${tag} [${colors_1.default.dim(nowPrettyPrinted)}]: ${body}\n`;
    }
    formatTimestamp(timestamp) {
        return new Date(timestamp).toISOString();
    }
    getMessageFromLog(message) {
        if (typeof message === "string") {
            return message;
        }
        else {
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
}
exports.Logger = Logger;
exports.log = new Logger();
//# sourceMappingURL=Logger.js.map