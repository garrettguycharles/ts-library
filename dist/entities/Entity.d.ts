export interface IEntity {
    id: string;
    tags: string[];
}
export declare class Entity<T extends IEntity> implements IEntity {
    id: string;
    tags: string[];
    withId<C extends Entity<T>>(this: C, id: string): C;
    withTags<C extends Entity<T>>(this: C, tags: string[]): C;
    setTag(key: string, value: string): void;
    readTag(key: string): string | undefined;
    removeTag(key: string): void;
    provideTagSeparator(): string;
    from<C extends Entity<T>>(this: C, other: T): C;
    private getInterfaceKeys;
}
export interface ISearchableEntity extends IEntity {
    searchable: string[];
}
export declare class SearchableEntity<T extends ISearchableEntity> extends Entity<T> implements ISearchableEntity {
    searchable: string[];
    withSearchable<C extends SearchableEntity<T>>(this: C, searchable: string[]): C;
    protected buildSearchable<C extends SearchableEntity<T>>(this: C): string[];
    populateSearchable<C extends SearchableEntity<T>>(this: C): C;
}
//# sourceMappingURL=Entity.d.ts.map