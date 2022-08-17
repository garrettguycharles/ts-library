import {SearchQuery} from "./Dao";
import {Semaphore} from "../../engines/Semaphore";
import {getAllStringBearingHashPaths, getValueAtHashPath} from "../../utils/functions";
import {InternalServerError} from "../../server/error/PrefixedErrors";
import {Entity} from "../../entities/Entity";

export interface ISearch<T extends Entity> {
    ingest(item: T): void | Promise<void>;
    search(query: SearchQuery): T[] | Promise<T[]>;
}

// TODO: add "Remove" functionality to delete a search index.

export class Search<T extends Entity> implements ISearch<T> {

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

        let searchables = this.getSearchablesFromObject(item);

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

    private getSearchablesFromObject(entity: any): string[] {
        const validKeys = Object.keys(entity).filter(k => typeof entity[k] === "string");

        return validKeys.map(k => entity[k].toLowerCase().replace(/\s/g, "")).filter(s => s.length && s.length < 128);
    }
}


