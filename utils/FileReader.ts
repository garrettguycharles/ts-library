import fs from "fs";

export interface FileReader {
    read(path: string): string;
}

export class TextFileReader {
    read(path: string): string {
        return fs.readFileSync(path).toString("utf8");
    }
}