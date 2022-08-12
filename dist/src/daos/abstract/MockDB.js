"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDBSearchableDao = exports.MockDBDao = void 0;
const Dao_1 = require("./Dao");
const PrefixedErrors_1 = require("../../entities/error/PrefixedErrors");
class MockDBDao {
    db;
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
    insert(item) {
        const found = this.db.find(i => i.id === item.id);
        if (found) {
            throw new PrefixedErrors_1.BadRequestError("Can't insert item: item with that ID already exists.");
        }
        this.db.push(item);
        return item;
    }
    update(item) {
        const found = this.db.find(i => i.id === item.id);
        if (!found) {
            throw new PrefixedErrors_1.BadRequestError("Can't update item: item with that ID does not exist.");
        }
        return Object.assign(found, item);
    }
}
exports.MockDBDao = MockDBDao;
class MockDBSearchableDao extends MockDBDao {
    search;
    constructor(db, search) {
        super(db);
        this.search = search;
    }
    async findBySearch(queries) {
        const toReturn = [];
        for (const query of queries) {
            const outcome = await this.search.search(query);
            toReturn.push(new Dao_1.SearchQueryOutcome().withQuery(query).withPayload(outcome));
        }
        return toReturn;
    }
    async insert(item) {
        const toReturn = await super.insert(item);
        await this.search.ingest(item);
        return toReturn;
    }
    async update(item) {
        const toReturn = super.update(item);
        await this.search.ingest(item);
        return toReturn;
    }
}
exports.MockDBSearchableDao = MockDBSearchableDao;
