"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiLogger = void 0;
const Logger_1 = require("./Logger");
class ApiLogger extends Logger_1.Logger {
    url;
    constructor(url) {
        super();
        this.url = url;
    }
    log(level, message) {
        // axios.post(this.url, {level: level, message: message});
    }
}
exports.ApiLogger = ApiLogger;
