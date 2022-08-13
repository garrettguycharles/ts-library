import fs from "fs";
import {parse as csvParse} from 'papaparse';

export class TextFileReader {
    read(path: string): string {
        return fs.readFileSync(path).toString("utf8");
    }
}

export class CsvFileReader extends TextFileReader {
    readCsv(path: string): { [key: string]: string }[] {
        const plainContents = this.read(path);

        // parse the csv into JSON
        const json: { [key: string]: string }[] = [];
        csvParse<{ [key: string]: string }>(plainContents, {
            header: true,
            step: function (row) {
                json.push(row.data);
            }
        });

        return json;
    }
}