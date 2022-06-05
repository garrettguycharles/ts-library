export const sleep = async (ms: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, ms));
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