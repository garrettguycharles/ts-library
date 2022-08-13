"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = exports.TextFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = require("papaparse");
class TextFileReader {
    read(path) {
        return fs_1.default.readFileSync(path).toString("utf8");
    }
}
exports.TextFileReader = TextFileReader;
class CsvFileReader extends TextFileReader {
    readCsv(path) {
        const plainContents = this.read(path);
        const json = [];
        (0, papaparse_1.parse)(plainContents, {
            header: true,
            step: function (row) {
                json.push(row.data);
            }
        });
        return json;
    }
}
exports.CsvFileReader = CsvFileReader;
//# sourceMappingURL=FileReader.js.map