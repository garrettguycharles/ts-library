export declare class Entity {
    id: string;
    tags: string[];
    withId(id: string): this;
    withTags(tags: string[]): this;
    setTag(key: string, value: string): void;
    readTag(key: string): string | undefined;
    removeTag(key: string): void;
    provideTagSeparator(): string;
    from(other: any): this;
    static getInterfaceKeys(entity: Entity): string[];
}
//# sourceMappingURL=Entity.d.ts.map