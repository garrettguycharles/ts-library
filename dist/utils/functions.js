"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setImmediate = exports.getValueAtHashPath = exports.getAllStringBearingHashPaths = exports.prettyFormatDate = exports.random_choice = exports.random_range = exports.clamp = exports.modulo = exports.sleep = void 0;
const sleep = async (ms) => {
    return await new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
function modulo(n, mod) {
    return ((n % mod) + mod) % mod;
}
exports.modulo = modulo;
function clamp(lo, val, hi) {
    return Math.max(lo, Math.min(val, hi));
}
exports.clamp = clamp;
const random_range = (lo, hi) => {
    if (hi < lo) {
        [hi, lo] = [lo, hi];
    }
    return Math.floor(Math.random() * (hi - lo + 1) + lo);
};
exports.random_range = random_range;
function random_choice(t) {
    return t[(0, exports.random_range)(0, t.length - 1)];
}
exports.random_choice = random_choice;
function prettyFormatDate(date) {
    return date.toLocaleDateString('en-us', {
        weekday: "long", year: "numeric",
        month: "short", day: "numeric",
        hour: "numeric", minute: "numeric"
    });
}
exports.prettyFormatDate = prettyFormatDate;
function getAllStringBearingHashPaths(obj) {
    const visited = new Set();
    function getObjectPaths(obj) {
        let objPaths = [];
        if (visited.has(obj)) {
            return [];
        }
        visited.add(obj);
        for (let key of Object.keys(obj)) {
            try {
                if (typeof obj[key] === "string") {
                    objPaths.push(key);
                }
                if (typeof obj[key] === "object") {
                    if (Array.isArray(obj)) {
                        continue;
                    }
                    for (const path of getObjectPaths(obj[key])) {
                        objPaths.push(`${key}.${path}`);
                    }
                }
            }
            catch (e) { }
        }
        return objPaths;
    }
    return getObjectPaths(obj);
}
exports.getAllStringBearingHashPaths = getAllStringBearingHashPaths;
const getValueAtHashPath = (path, obj) => {
    const pathArray = path.split(".");
    let objDrilled = obj;
    try {
        for (const part of pathArray) {
            objDrilled = objDrilled[part];
        }
        return objDrilled;
    }
    catch (e) {
        return undefined;
    }
};
exports.getValueAtHashPath = getValueAtHashPath;
const setImmediate = (fn) => {
    return setTimeout(fn, 0);
};
exports.setImmediate = setImmediate;
//# sourceMappingURL=functions.js.map