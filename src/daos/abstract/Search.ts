import {ISearchableEntity} from "../../entities/Entity";
import {SearchQuery} from "./Dao";
import {Semaphore} from "../../engines/Semaphore";
import {getAllStringBearingHashPaths, getValueAtHashPath} from "../../utils/functions";
import {InternalServerError} from "../../entities/error/PrefixedErrors";

export interface ISearch<T extends ISearchableEntity> {
    ingest(item: T): void | Promise<void>;
    search(query: SearchQuery): T[] | Promise<T[]>;
}

// TODO: add "Remove" functionality to delete a search index.

export class Search<T extends ISearchableEntity> implements ISearch<T> {

    map: {[path: string]: Set<number>} = {};
    items: {[number: number]: T} = {};
    item_ids: Set<string> = new Set<string>();

    item_counter = 0;
    item_counter_semaphore = new Semaphore();

    async ingest(item: T): Promise<void> {
        let next_num: number = -1;
        if (this.item_ids.has(item.id)) {
            for (const [key, i] of Object.entries(this.items)) {

                if (i.id === item.id) {
                    next_num = parseInt(key);
                }
            }

            if (next_num < 0) {
                throw new InternalServerError("Something weird happened.");
            }
        } else {
            next_num = await this.getNextItemNumber();
        }


        let searchables = item.searchable;

        this.items[next_num] = item;
        this.item_ids.add(item.id);

        for (const searchable of searchables) {
            for (let i = 0; i < searchable.length; i++) {
                const hashpath = searchable.substring(i);
                this.insertItemAlongHashPath(next_num, hashpath);
            }
        }

        const allHashPaths = getAllStringBearingHashPaths(item);

        for (const path of allHashPaths) {
            const pathValue = getValueAtHashPath(path, item).replace(/\s/g, "").toLowerCase();

            if (pathValue) {
                for (let i = 0; i < pathValue.length; i++) {
                    const hashpath = pathValue.substring(i);
                    this.insertItemAlongHashPath(next_num, hashpath, path);
                }
            }
        }
    }

    async getNextItemNumber(): Promise<number> {
        return await this.item_counter_semaphore.call(async () => {
            this.item_counter += 1;
            return this.item_counter;
        });
    }

    search(query: SearchQuery): Promise<T[]> {
        const searchHash = query.hashpath + query.query.replace(/\s/g, "").toLowerCase();
        return Promise.resolve(Array.from(this.map[searchHash] || []).map(num => this.items[num]).filter(i => i));
    }

    private insertItemAlongHashPath(item_number: number, hashpath: string, prefix = ""): void {
        for (let i = 1; i < hashpath.length + 1; i++) {
            const key = prefix + hashpath.substring(0, i);

            if (!this.map[key]) {
                this.map[key] = new Set<number>();
            }

            this.map[key].add(item_number);
        }
    }
}

// const garrett = new User().withGivenName("Garrett").withFamilyName("Charles");
// const emma = new User().withGivenName("Emma").withFamilyName("Charles");
//
// const search = new Search<User>();
//
// async function test() {
//     let start = Date.now();
//     for (let i = 0; i < 10; i++) {
//         await search.ingest(garrett);
//         garrett.family_name += "again";
//     }
//
//     garrett.family_name = "";
//     search.ingest(garrett);
//     await search.ingest(emma);
//     let end = Date.now();
//     console.log(search.item_counter, `${end - start}ms`);
//
//     const queries = [
//         new SearchQuery().withHashPath("given_name").withQuery("ga"),
//         new SearchQuery().withHashPath("family_name").withQuery("le")
//     ];
//
//     for (const q of queries) {
//         console.log(await search.search(q));
//     }
// }
//
// test();