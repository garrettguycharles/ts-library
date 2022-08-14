export class FindQueryOptions {
    reverse = false;
    last_seen: string | undefined;
    limit: number | undefined;
}

export type SearchQuery = { [hashpath: string]: string };