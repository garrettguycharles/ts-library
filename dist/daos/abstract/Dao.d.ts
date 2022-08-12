import { IEntity, ISearchableEntity } from "../../entities/Entity";
export declare class ResponseOptions {
    reverse: boolean;
    last_seen_id: string | undefined;
    limit: number | undefined;
}
export declare class SearchQuery {
    hashpath: string;
    query: string;
    caseSensitive: boolean;
    exact: boolean;
    matchFull: boolean;
    responseOptions: ResponseOptions;
    withHashPath(hp: string): SearchQuery;
    withQuery(query: string): SearchQuery;
    withCaseSensitive(isCaseSensitive: boolean): SearchQuery;
    withExact(isExact: boolean): SearchQuery;
    withMatchFull(isMatchFull: boolean): SearchQuery;
    withResponseOptions(options: ResponseOptions): SearchQuery;
}
export declare class SearchQueryOutcome<T extends IEntity> {
    query: SearchQuery;
    payload: T[];
    withQuery(query: SearchQuery): SearchQueryOutcome<T>;
    withPayload(payload: T[]): SearchQueryOutcome<T>;
}
export interface IDao<T extends IEntity> {
    findOneById(id: string): Promise<T | undefined> | T | undefined;
    findMany(options: ResponseOptions): Promise<T[]> | T[];
    insert(item: T): Promise<T | undefined> | T | undefined;
    delete(id: string): Promise<T | undefined> | T | undefined;
    update(item: T): Promise<T | undefined> | T | undefined;
}
export interface ISearchableDao<T extends ISearchableEntity> extends IDao<T> {
    findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]> | SearchQueryOutcome<T>[];
}
//# sourceMappingURL=Dao.d.ts.map