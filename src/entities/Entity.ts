import {v4} from "uuid";

export class Entity {
    id = v4();
    tags: string[] = [];

    withId(id: string): this {
        this.id = id;
        return this;
    }

    withTags(tags: string[]): this {
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

    from(other: any): this {
        const validKeys = Entity.getInterfaceKeys(this);

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

    static getInterfaceKeys(entity: Entity): string[] {
        // @ts-ignore
        const blankImpl = new entity.constructor();

        return Object.keys(blankImpl).filter(k => {
            return typeof blankImpl[k] !== "function";
        });
    }
}