import {Dao, ResponseOptions, SearchQuery, SearchQueryOutcome} from "./Dao";
import {Search} from "./Search";
import {BadRequestError} from "../../server/error/PrefixedErrors";
import {Entity} from "../../entities/Entity";

export class MockDao<T extends Entity> implements Dao<T> {

    db: T[];

    search = new Search<T>();

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

    async insert(item: T): Promise<T | undefined> {
        const found = this.db.find(i => i.id === item.id);
        if (found) {
            throw new BadRequestError("Can't insert item: item with that ID already exists.");
        }

        this.db.push(item);

        await this.search.ingest(item);

        return item;
    }

    async update(item: T): Promise<T | undefined> {
        const found = this.db.find(i => i.id === item.id);

        if (!found) {
            throw new BadRequestError("Can't update item: item with that ID does not exist.");
        }

        await this.search.ingest(item);

        return Object.assign(found, item);
    }

    async findBySearch(queries: SearchQuery[]): Promise<SearchQueryOutcome<T>[]> {
        const toReturn: SearchQueryOutcome<T>[] = [];
        for (const query of queries) {
            const outcome = await this.search.search(query);

            toReturn.push(new SearchQueryOutcome<T>().withQuery(query).withPayload(outcome));
        }

        return toReturn;
    }
}