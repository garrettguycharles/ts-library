import { IEntity, ISearchableEntity } from "../../entities/Entity";
import { IDao, ISearchableDao, ResponseOptions, SearchQuery, SearchQueryOutcome } from "./Dao";
import { Search } from "./Search";
export declare class MockDBDao<T extends IEntity> implements IDao<T> {
    db: T[];
    constructor(db?: T[]);
    delete(id: string): Promise<T | undefined> | T | undefined;
    findMany(options: ResponseOptions): Promise<T[]> | T[];
    findOneById(id: string): T | undefined;
    insert(item: T): Promise<T | undefined> | T | undefined;
    update(item: T): Promise<T | undefined> | T | undefined;
}
export declare class MockDBSearchableDao<T extends ISearchableEntity> extends MockDBDao<T> implements ISearchableDao<T> {
    search: Search<T>;
    constructor(db: T[], search: Search<T>);
    findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]>;
    insert(item: T): Promise<T | undefined>;
    update(item: T): Promise<T | undefined>;
}
//# sourceMappingURL=MockDB.d.ts.map