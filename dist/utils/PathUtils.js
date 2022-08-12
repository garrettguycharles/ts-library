"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathUtils = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class PathUtils {
    static getPathDelimiter(path) {
        path = path || process.cwd();
        let toReturn = "\\";
        if (path.lastIndexOf(toReturn) < 0) {
            toReturn = "/";
            if (path.lastIndexOf(toReturn) < 0) {
                toReturn = "";
            }
        }
        return toReturn;
    }
    static split(path) {
        let separator = this.getPathDelimiter(path);
        if (!separator) {
            return [path];
        }
        return path.split(separator);
    }
    /**
     * removes the last segment of the path,
     * and returns the parent dir
     * @param path
     */
    static getPathWithoutLeaf(filepath) {
        let separator = this.getPathDelimiter();
        let parent_path = PathUtils.join(...PathUtils.split(filepath).slice(0, -1));
        if (!parent_path.startsWith(separator) && this.getPathDelimiter() !== "\\") {
            parent_path = separator + parent_path;
        }
        return parent_path;
    }
    static join(...segments) {
        // TODO: add extra segment validation here
        return path_1.default.join(...segments).replace(/\\/g, "/");
    }
    static graft(parent, child) {
        const parentSplit = this.split(parent);
        const childSplit = this.split(child);
        const endIndex = parentSplit.findIndex(segment => segment === childSplit[0]);
        return path_1.default.join(...parentSplit.slice(0, endIndex).concat(childSplit));
    }
    static resolve(newPath, currentDir = process.cwd()) {
        const delimiter = this.getPathDelimiter(newPath);
        if (this.isRelativePath(newPath)) {
            // return a join
            return PathUtils.join(path_1.default.resolve(currentDir), newPath);
        }
        if (this.isAbsolutePath(newPath)) {
            return path_1.default.resolve(newPath);
        }
        // is a path like `models/nextDir/model.graphml`
        const toReturn = this.graft(currentDir, newPath);
        return path_1.default.resolve(toReturn);
    }
    static getLeaf(filepath) {
        const splitpath = this.split(filepath);
        return splitpath[splitpath.length - 1];
    }
    static getFileExtension(filepath) {
        return filepath.substring(filepath.lastIndexOf(".") + 1);
    }
    static getFileNameWithoutExtension(filepath) {
        const toReturn = this.getLeaf(filepath);
        return toReturn.substring(0, toReturn.lastIndexOf("."));
    }
    static addFilenameSuffix(filepath, suffix) {
        const rightPeriod = filepath.lastIndexOf(".");
        return filepath.substring(0, rightPeriod) + suffix + filepath.substring(rightPeriod);
    }
    static isRelativePath(filepath) {
        const delimiter = this.getPathDelimiter(filepath);
        if (!delimiter) {
            return true;
        }
        return filepath.trim().startsWith(`..${delimiter}`) || filepath.trim().startsWith(`.${delimiter}`);
    }
    static isAbsolutePath(filepath) {
        const delimiter = this.getPathDelimiter(filepath);
        if (!delimiter) {
            return false;
        }
        return filepath.trim().startsWith(delimiter);
    }
    static importCache = {};
    static directoriesRead = {};
    /**
     * Returns an absolute path to a file.
     * @param importFileName the name of the expected import file, including file extension
     * @param startPath Where to begin searching for the import.
     */
    static resolveImportPath(importFileName, startPath) {
        if (!PathUtils.importCache[importFileName]) {
            // populate cache
            PathUtils.importCache[importFileName] = "";
            let visitedDirs = new Set();
            function searchDir(dirPath) {
                if (visitedDirs.has(dirPath)) {
                    return "";
                }
                visitedDirs.add(dirPath);
                if (!PathUtils.directoriesRead[dirPath]) {
                    let dirWalk = fs_1.default.readdirSync(dirPath).map(f => PathUtils.join(dirPath, f));
                    let dirContents = { dirs: [], files: [] };
                    dirWalk.forEach((filepath) => {
                        const itemStat = fs_1.default.statSync(filepath);
                        if (itemStat.isFile()) {
                            dirContents.files.push(filepath);
                        }
                        if (itemStat.isDirectory()) {
                            dirContents.dirs.push(filepath);
                        }
                    });
                    PathUtils.directoriesRead[dirPath] = dirContents;
                }
                const dirToVisit = PathUtils.directoriesRead[dirPath];
                for (const item of dirToVisit.files) {
                    const itemName = PathUtils.getLeaf(item);
                    PathUtils.importCache[itemName] = item;
                    if (itemName === importFileName) {
                        return item;
                    }
                }
                for (const item of dirToVisit.dirs) {
                    const dirSearchResult = searchDir(item);
                    if (dirSearchResult) {
                        return dirSearchResult;
                    }
                }
                return "";
            }
            let dir = startPath;
            for (let upwardStepCount = 0; upwardStepCount < PathUtils.MaxUpwardImportResolutionSteps; upwardStepCount++) {
                dir = PathUtils.getPathWithoutLeaf(dir);
                const dirSearchResult = searchDir(dir);
                if (dirSearchResult) {
                    PathUtils.importCache[importFileName] = dirSearchResult;
                    break;
                }
            }
        }
        return PathUtils.importCache[importFileName];
    }
    static MaxUpwardImportResolutionSteps = 4;
    /**
     * Returns the relative path from one absolute path to another
     * @param fromAbsolute
     * @param toAbsolute
     */
    static findRelativePath(fromAbsolute, toAbsolute) {
        if (fromAbsolute === toAbsolute) {
            return ".";
        }
        // determine if fromAbsolute refers to a file or directory
        let isDirectory = false;
        let isFile = false;
        try {
            const stats = fs_1.default.statSync(fromAbsolute);
            isDirectory = stats.isDirectory();
            isFile = !isDirectory;
        }
        catch (e) {
            // swallow error
        }
        if (isFile) {
            // the path is a file, so remove the leaf
            fromAbsolute = PathUtils.getPathWithoutLeaf(fromAbsolute);
        }
        else if (!isDirectory) {
            // this means that the file doesn't exist (fs.statSync threw an error above), so we have to guess.
            // if fromAbsolute is a file, remove the leaf
            if (/(?<=.+)\.(ts|js|graphml|drawio|json|txt|java|cpp|c|py)$/.test(PathUtils.getLeaf(fromAbsolute).trim())) {
                fromAbsolute = PathUtils.getPathWithoutLeaf(fromAbsolute);
            }
        }
        let from = PathUtils.split(fromAbsolute).filter(segment => segment.trim().length > 0);
        let to = PathUtils.split(toAbsolute).filter(segment => segment.trim().length > 0);
        while ((from.length || to.length) && from[0] === to[0]) {
            from = from.slice(1);
            to = to.slice(1);
        }
        if (from.length > 0) {
            return PathUtils.join(...Array(from.length).fill("..").concat(to));
        }
        else {
            return [".", PathUtils.join(...to)].join("/");
        }
    }
}
exports.PathUtils = PathUtils;
