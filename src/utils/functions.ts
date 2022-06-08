export const sleep = async (ms: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

export function modulo(n: number, mod: number): number {
    return ((n % mod) + mod) % mod;
}

export function clamp(lo: number, val: number, hi: number): number {
    return Math.max(lo, Math.min(val, hi));
}

export const random_range = (lo: number, hi: number): number => {
    if (hi < lo) {
        [hi, lo] = [lo, hi];
    }

    return Math.floor(Math.random() * (hi - lo + 1) + lo);
}

export function random_choice<T>(t: T[]): T {
    return t[random_range(0, t.length - 1)];
}

export function prettyFormatDate(date: Date): string {
    return date.toLocaleDateString('en-us', {
        weekday:"long", year:"numeric",
        month:"short", day:"numeric",
        hour: "numeric", minute: "numeric"
    });
}

/**
 * Returns all hashpaths within obj which resolve to a string value.
 * @param obj
 */
export function getAllStringBearingHashPaths(obj: {[key: string]: any}): string[] {
    const visited: Set<any> = new Set<any>();

    function getObjectPaths(obj: any): string[] {
        let objPaths: string[] = [];

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
            } catch (e) {}
        }
        return objPaths;
    }

    return getObjectPaths(obj);
}

export const getValueAtHashPath = (path: string, obj: any): any | undefined => {
    const pathArray = path.split(".");

    let objDrilled: any = obj;

    try {
        for (const part of pathArray) {
            objDrilled = objDrilled[part];
        }

        return objDrilled;
    } catch (e) {
        return undefined;
    }
}