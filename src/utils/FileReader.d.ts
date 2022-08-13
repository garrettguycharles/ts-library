export declare class TextFileReader {
    read(path: string): string;
}
export declare class CsvFileReader extends TextFileReader {
    readCsv(path: string): {
        [key: string]: string;
    }[];
}
//# sourceMappingURL=FileReader.d.ts.map