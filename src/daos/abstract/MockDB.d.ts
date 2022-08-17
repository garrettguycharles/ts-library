import { Dao, ResponseOptions, SearchQuery, SearchQueryOutcome } from "./Dao";
import { Search } from "./Search";
import { Entity } from "../../entities/Entity";
export declare class MockDao<T extends Entity> implements Dao<T> {
    db: T[];
    search: Search<T>;
    constructor(db?: T[]);
    delete(id: string): Promise<T | undefined> | T | undefined;
    findMany(options: ResponseOptions): Promise<T[]> | T[];
    findOneById(id: string): T | undefined;
    insert(item: T): Promise<T | undefined>;
    update(item: T): Promise<T | undefined>;
    findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]>;
}
//# sourceMappingURL=MockDB.d.ts.map