export declare class PathUtils {
    static getPathDelimiter(path?: string): string;
    static split(path: string): string[];
    static getPathWithoutLeaf(filepath: string): string;
    static join(...segments: string[]): string;
    static graft(parent: string, child: string): string;
    static resolve(newPath: string, currentDir?: string): string;
    static getLeaf(filepath: string): string;
    static getFileExtension(filepath: string): string;
    static getFileNameWithoutExtension(filepath: string): string;
    static addFilenameSuffix(filepath: string, suffix: string): string;
    static isRelativePath(filepath: string): boolean;
    static isAbsolutePath(filepath: string): boolean;
    private static importCache;
    private static directoriesRead;
    static resolveImportPath(importFileName: string, startPath: string): string;
    static MaxUpwardImportResolutionSteps: number;
    static findRelativePath(fromAbsolute: string, toAbsolute: string): string;
}
//# sourceMappingURL=PathUtils.d.ts.map