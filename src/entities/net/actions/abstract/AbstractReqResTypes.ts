import {FindQueryOptions, SearchQuery} from "../../QueryOptions";
import {AbstractRequest, IResponse} from "./HttpRequestResponse";

export abstract class PayloadRequest<T> extends AbstractRequest {
    payload: T = this.getDefaultPayload();

    withPayload<C extends PayloadRequest<T>>(this: C, payload: T): C {
        this.payload = payload;
        return this;
    }

    abstract getDefaultPayload(): T;
}

export abstract class FindOptionsRequest extends AbstractRequest {
    options = new FindQueryOptions();

    withOptions(options: FindQueryOptions): FindOptionsRequest {
        this.options = options;
        return this;
    }
}
export abstract class SearchRequest extends AbstractRequest {
    query: SearchQuery = {};
    options = new FindQueryOptions();

    withQuery(query: SearchQuery): SearchRequest {
        this.query = query;
        return this;
    }

    withOptions(options: FindQueryOptions): SearchRequest {
        this.options = options;
        return this;
    }
}
export abstract class StringCarrierRequest extends AbstractRequest {
    payload = "";

    withPayload<C extends StringCarrierRequest>(this: C, payload: string): C {
        this.payload = payload;
        return this;
    }
}
export class AbstractArrayCarrierResponse<T> implements IResponse {
    payload: T[] = [];

    withPayload<C extends AbstractArrayCarrierResponse<T>>(this: C, payload: T[]): C {
        this.payload = payload;
        return this;
    }
}
export class PayloadResponse<T> implements IResponse {
    payload?: T;

    withPayload(payload: T): this {
        this.payload = payload;
        return this;
    }
}