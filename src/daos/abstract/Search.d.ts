import { SearchQuery } from "./Dao";
import { Semaphore } from "../../engines/Semaphore";
import { Entity } from "../../entities/Entity";
export interface ISearch<T extends Entity> {
    ingest(item: T): void | Promise<void>;
    search(query: SearchQuery): T[] | Promise<T[]>;
}
export declare class Search<T extends Entity> implements ISearch<T> {
    map: {
        [path: string]: Set<number>;
    };
    items: {
        [number: number]: T;
    };
    item_ids: Set<string>;
    item_counter: number;
    item_counter_semaphore: Semaphore;
    ingest(item: T): Promise<void>;
    getNextItemNumber(): Promise<number>;
    search(query: SearchQuery): Promise<T[]>;
    private insertItemAlongHashPath;
    private getSearchablesFromObject;
}
//# sourceMappingURL=Search.d.ts.map