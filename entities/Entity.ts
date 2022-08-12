import {v4} from "uuid";

export interface IEntity {
    id: string;
    tags: string[];
}

export class Entity<T extends IEntity> implements IEntity {
    id = v4();
    tags: string[] = [];

    withId<C extends Entity<T>>(this: C, id: string): C {
        this.id = id;
        return this;
    }

    withTags<C extends Entity<T>>(this: C, tags: string[]): C {
        this.tags = tags;
        return this;
    }

    setTag(key: string, value: string): void {
        if (key.length < 1 || value.length < 1) {
            console.warn(`Tried to set tag with bad key or value. Tag: "${key}:${value}"`);
            return;
        }

        this.tags = this.tags.filter(t => !(t.split(this.provideTagSeparator())[0] === key));

        this.tags.push(`${key}:${value}`);
    }

    readTag(key: string): string | undefined {
        const found = this.tags.find(t => t.split(this.provideTagSeparator())[0] === key);

        if (found) {
            return found.split(":")[1];
        }

        return undefined;
    }

    removeTag(key: string): void {
        this.tags = this.tags.filter(t => t.split(this.provideTagSeparator())[0] !== key);
    }

    provideTagSeparator(): string {
        return ":=:";
    }

    from<C extends Entity<T>>(this: C, other: T): C {
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
                    } else {
                        // @ts-ignore
                        this[key] = [...otherVal];
                    }
                    // @ts-ignore
                } else if (typeof this[key]["from"] === "function") {
                    // @ts-ignore
                    this[key].from(other[key]);
                } else {
                    // @ts-ignore
                    this[key] = otherVal;
                }
            }
        }

        return this;
    }

    private getInterfaceKeys<C extends Entity<T>>(this: C): string[] {
        // get blank implementation
        // @ts-ignore
        const blankImpl = new this.constructor();

        return Object.keys(blankImpl).filter(k => {
            return typeof blankImpl[k] !== "function";
        });
    }
}

export interface ISearchableEntity extends IEntity {
    searchable: string[];
}

export class SearchableEntity<T extends ISearchableEntity> extends Entity<T> implements ISearchableEntity {
    searchable: string[] = [];

    withSearchable<C extends SearchableEntity<T>>(this: C, searchable: string[]): C {
        this.searchable = searchable;
        return this;
    }

    protected buildSearchable<C extends SearchableEntity<T>>(this: C): string[] {
        // @ts-ignore
        const validKeys = this.getInterfaceKeys().filter(k => typeof this[k] === "string");

        // @ts-ignore
        return validKeys.map(k => this[k].toLowerCase().replace(/\s/g, "")).filter(s => s.length && s.length < 128);
    }

    populateSearchable<C extends SearchableEntity<T>>(this: C): C {
        this.searchable = this.buildSearchable();

        return this;
    }
}