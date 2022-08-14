"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const Semaphore_1 = require("../../engines/Semaphore");
const functions_1 = require("../../utils/functions");
const PrefixedErrors_1 = require("../../server/net/error/PrefixedErrors");
class Search {
    map = {};
    items = {};
    item_ids = new Set();
    item_counter = 0;
    item_counter_semaphore = new Semaphore_1.Semaphore();
    async ingest(item) {
        let next_num = -1;
        if (this.item_ids.has(item.id)) {
            for (const [key, i] of Object.entries(this.items)) {
                if (i.id === item.id) {
                    next_num = parseInt(key);
                }
            }
            if (next_num < 0) {
                throw new PrefixedErrors_1.InternalServerError("Something weird happened.");
            }
        }
        else {
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
        const allHashPaths = (0, functions_1.getAllStringBearingHashPaths)(item);
        for (const path of allHashPaths) {
            const pathValue = (0, functions_1.getValueAtHashPath)(path, item).replace(/\s/g, "").toLowerCase();
            if (pathValue) {
                for (let i = 0; i < pathValue.length; i++) {
                    const hashpath = pathValue.substring(i);
                    this.insertItemAlongHashPath(next_num, hashpath, path);
                }
            }
        }
    }
    async getNextItemNumber() {
        return await this.item_counter_semaphore.call(async () => {
            this.item_counter += 1;
            return this.item_counter;
        });
    }
    search(query) {
        const searchHash = query.hashpath + query.query.replace(/\s/g, "").toLowerCase();
        return Promise.resolve(Array.from(this.map[searchHash] || []).map(num => this.items[num]).filter(i => i));
    }
    insertItemAlongHashPath(item_number, hashpath, prefix = "") {
        for (let i = 1; i < hashpath.length + 1; i++) {
            const key = prefix + hashpath.substring(0, i);
            if (!this.map[key]) {
                this.map[key] = new Set();
            }
            this.map[key].add(item_number);
        }
    }
}
exports.Search = Search;
//# sourceMappingURL=Search.js.map