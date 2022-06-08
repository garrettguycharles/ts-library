import {IEntity, ISearchableEntity} from "../../entities/Entity";
import {IDao, ISearchableDao, ResponseOptions, SearchQuery, SearchQueryOutcome} from "./Dao";
import {Search} from "./Search";
import {BadRequestError} from "../../entities/error/PrefixedErrors";

export class MockDBDao<T extends IEntity> implements IDao<T> {

    db: T[];

    constructor(db: T[] = []) {
        this.db = db;
    }

    delete(id: string): Promise<T | undefined> | T | undefined {
        const found = this.db.find(i => i.id === id);

        this.db = this.db.filter(i => i !== found);
        return found;
    }

    findMany(options: ResponseOptions): Promise<T[]> | T[] {
        const sorted = this.db.sort(
            (a, b) =>
                (a.id < b.id ? -1 : 1) * (options.reverse ? -1 : 1)
        );

        let start = 0;
        if (options.last_seen_id) {
            start = sorted.findIndex(i => i.id === options.last_seen_id) + 1;
        }

        if (options.limit) {
            return sorted.slice(start, start + options.limit);
        } else {
            return sorted.slice(start);
        }
    }

    findOneById(id: string): T | undefined {
        return this.db.find(i => i.id === id);
    }

    insert(item: T): Promise<T | undefined> | T | undefined {
        const found = this.db.find(i => i.id === item.id);
        if (found) {
            throw new BadRequestError("Can't insert item: item with that ID already exists.");
        }

        this.db.push(item);

        return item;
    }

    update(item: T): Promise<T | undefined> | T | undefined {
        const found = this.db.find(i => i.id === item.id);

        if (!found) {
            throw new BadRequestError("Can't update item: item with that ID does not exist.");
        }

        return Object.assign(found, item);
    }
}

export class MockDBSearchableDao<T extends ISearchableEntity> extends MockDBDao<T> implements ISearchableDao<T> {
    search: Search<T>;

    constructor(db: T[], search: Search<T>) {
        super(db);
        this.search = search;
    }

    async findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]> {
        const toReturn: SearchQueryOutcome<T>[] = [];
        for (const query of queries) {
            const outcome = await this.search.search(query);

            toReturn.push(new SearchQueryOutcome<T>().withQuery(query).withPayload(outcome));
        }

        return toReturn;
    }

    async insert(item: T): Promise<T | undefined> {
        const toReturn = await super.insert(item);

        await this.search.ingest(item);

        return toReturn;
    }

    async update(item: T): Promise<T | undefined> {
        const toReturn = super.update(item);

        await this.search.ingest(item);

        return toReturn;
    }
}