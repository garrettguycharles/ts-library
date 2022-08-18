"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    id = "";
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
        const validKeys = Entity.getInterfaceKeys(this);
        for (const key of validKeys) {
            const otherVal = other[key];
            if (otherVal) {
                if (Array.isArray(this[key])) {
                    if (otherVal.length === 0) {
                        continue;
                    }
                    if (otherVal[0]["from"] === "function") {
                        for (const item of otherVal[0]) {
                            this[key].push(new item.constructor().from(item));
                        }
                    }
                    else {
                        this[key] = [...otherVal];
                    }
                }
                else if (typeof this[key]["from"] === "function") {
                    this[key].from(other[key]);
                }
                else {
                    this[key] = otherVal;
                }
            }
        }
        return this;
    }
    static getInterfaceKeys(entity) {
        const blankImpl = new entity.constructor();
        return Object.keys(blankImpl).filter(k => {
            return typeof blankImpl[k] !== "function";
        });
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map