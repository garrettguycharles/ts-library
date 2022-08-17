import {Entity} from "../../entities/Entity";

export class ResponseOptions {
    reverse = false;
    last_seen_id: string | undefined;
    limit: number | undefined;
}

export class SearchQuery {
    hashpath = "";
    query = "";
    caseSensitive = false;
    exact = false;
    matchFull = false;
    responseOptions = new ResponseOptions();

    withHashPath(hp: string): SearchQuery {
        this.hashpath = hp;
        return this;
    }

    withQuery(query: string): SearchQuery {
        this.query = query;
        return this;
    }

    withCaseSensitive(isCaseSensitive: boolean): SearchQuery {
        this.caseSensitive = isCaseSensitive;
        return this;
    }

    withExact(isExact: boolean): SearchQuery {
        this.exact = isExact;
        return this;
    }

    withMatchFull(isMatchFull: boolean): SearchQuery {
        this.matchFull = isMatchFull;
        return this;
    }

    withResponseOptions(options: ResponseOptions): SearchQuery {
        this.responseOptions = options;
        return this;
    }
}

export class SearchQueryOutcome<T extends Entity> {
    query!: SearchQuery;
    payload: T[] = [];

    withQuery(query: SearchQuery): SearchQueryOutcome<T> {
        this.query = query;
        return this;
    }

    withPayload(payload: T[]): SearchQueryOutcome<T> {
        this.payload = payload;
        return this;
    }
}

export interface Dao<T extends Entity> {
    findOneById(id: string): Promise<T | undefined> | T | undefined;
    findMany(options: ResponseOptions): Promise<T[]> | T[];

    insert(item: T): Promise<T | undefined> | T | undefined;

    delete(id: string): Promise<T | undefined> | T | undefined;

    update(item: T): Promise<T | undefined> | T | undefined;

    findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]> | SearchQueryOutcome<T>[];
}