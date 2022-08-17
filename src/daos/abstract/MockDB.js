"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDao = void 0;
const Dao_1 = require("./Dao");
const Search_1 = require("./Search");
const PrefixedErrors_1 = require("../../server/error/PrefixedErrors");
class MockDao {
    db;
    search = new Search_1.Search();
    constructor(db = []) {
        this.db = db;
    }
    delete(id) {
        const found = this.db.find(i => i.id === id);
        this.db = this.db.filter(i => i !== found);
        return found;
    }
    findMany(options) {
        const sorted = this.db.sort((a, b) => (a.id < b.id ? -1 : 1) * (options.reverse ? -1 : 1));
        let start = 0;
        if (options.last_seen_id) {
            start = sorted.findIndex(i => i.id === options.last_seen_id) + 1;
        }
        if (options.limit) {
            return sorted.slice(start, start + options.limit);
        }
        else {
            return sorted.slice(start);
        }
    }
    findOneById(id) {
        return this.db.find(i => i.id === id);
    }
    async insert(item) {
        const found = this.db.find(i => i.id === item.id);
        if (found) {
            throw new PrefixedErrors_1.BadRequestError("Can't insert item: item with that ID already exists.");
        }
        this.db.push(item);
        await this.search.ingest(item);
        return item;
    }
    async update(item) {
        const found = this.db.find(i => i.id === item.id);
        if (!found) {
            throw new PrefixedErrors_1.BadRequestError("Can't update item: item with that ID does not exist.");
        }
        await this.search.ingest(item);
        return Object.assign(found, item);
    }
    async findBySearch(queries) {
        const toReturn = [];
        for (const query of queries) {
            const outcome = await this.search.search(query);
            toReturn.push(new Dao_1.SearchQueryOutcome().withQuery(query).withPayload(outcome));
        }
        return toReturn;
    }
}
exports.MockDao = MockDao;
//# sourceMappingURL=MockDB.js.map