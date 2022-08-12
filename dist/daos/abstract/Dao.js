"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryOutcome = exports.SearchQuery = exports.ResponseOptions = void 0;
class ResponseOptions {
    reverse = false;
    last_seen_id;
    limit;
}
exports.ResponseOptions = ResponseOptions;
class SearchQuery {
    hashpath = "";
    query = "";
    caseSensitive = false;
    exact = false;
    matchFull = false;
    responseOptions = new ResponseOptions();
    withHashPath(hp) {
        this.hashpath = hp;
        return this;
    }
    withQuery(query) {
        this.query = query;
        return this;
    }
    withCaseSensitive(isCaseSensitive) {
        this.caseSensitive = isCaseSensitive;
        return this;
    }
    withExact(isExact) {
        this.exact = isExact;
        return this;
    }
    withMatchFull(isMatchFull) {
        this.matchFull = isMatchFull;
        return this;
    }
    withResponseOptions(options) {
        this.responseOptions = options;
        return this;
    }
}
exports.SearchQuery = SearchQuery;
class SearchQueryOutcome {
    query;
    payload = [];
    withQuery(query) {
        this.query = query;
        return this;
    }
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.SearchQueryOutcome = SearchQueryOutcome;
