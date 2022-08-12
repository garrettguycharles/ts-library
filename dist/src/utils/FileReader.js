"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
class TextFileReader {
    read(path) {
        return fs_1.default.readFileSync(path).toString("utf8");
    }
}
exports.TextFileReader = TextFileReader;
