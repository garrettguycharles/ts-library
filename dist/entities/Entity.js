"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchableEntity = exports.Entity = void 0;
const uuid_1 = require("uuid");
class Entity {
    id = (0, uuid_1.v4)();
    tags = [];
    withId(id) {
        this.id = id;
        return this;
    }
    withTags(tags) {
        this.tags = tags;
        return this;
    }
    setTag(key, value) {
        if (key.length < 1 || value.length < 1) {
            console.warn(`Tried to set tag with bad key or value. Tag: "${key}:${value}"`);
            return;
        }
        this.tags = this.tags.filter(t => !(t.split(this.provideTagSeparator())[0] === key));
        this.tags.push(`${key}:${value}`);
    }
    readTag(key) {
        const found = this.tags.find(t => t.split(this.provideTagSeparator())[0] === key);
        if (found) {
            return found.split(":")[1];
        }
        return undefined;
    }
    removeTag(key) {
        this.tags = this.tags.filter(t => t.split(this.provideTagSeparator())[0] !== key);
    }
    provideTagSeparator() {
        return ":=:";
    }
    from(other) {
        const validKeys = this.getInterfaceKeys();
        // copy valid values
        for (const key of validKeys) {
            // @ts-ignore
            const otherVal = other[key];
            if (otherVal) {
                // @ts-ignore
                if (Array.isArray(this[key])) {
                    // handle array
                    if (otherVal.length === 0) {
                        continue;
                    }
                    if (otherVal[0]["from"] === "function") {
                        for (const item of otherVal[0]) {
                            // @ts-ignore
                            this[key].push(new item.constructor().from(item));
                        }
                    }
                    else {
                        // @ts-ignore
                        this[key] = [...otherVal];
                    }
                    // @ts-ignore
                }
                else if (typeof this[key]["from"] === "function") {
                    // @ts-ignore
                    this[key].from(other[key]);
                }
                else {
                    // @ts-ignore
                    this[key] = otherVal;
                }
            }
        }
        return this;
    }
    getInterfaceKeys() {
        // get blank implementation
        // @ts-ignore
        const blankImpl = new this.constructor();
        return Object.keys(blankImpl).filter(k => {
            return typeof blankImpl[k] !== "function";
        });
    }
}
exports.Entity = Entity;
class SearchableEntity extends Entity {
    searchable = [];
    withSearchable(searchable) {
        this.searchable = searchable;
        return this;
    }
    buildSearchable() {
        // @ts-ignore
        const validKeys = this.getInterfaceKeys().filter(k => typeof this[k] === "string");
        // @ts-ignore
        return validKeys.map(k => this[k].toLowerCase().replace(/\s/g, "")).filter(s => s.length && s.length < 128);
    }
    populateSearchable() {
        this.searchable = this.buildSearchable();
        return this;
    }
}
exports.SearchableEntity = SearchableEntity;
