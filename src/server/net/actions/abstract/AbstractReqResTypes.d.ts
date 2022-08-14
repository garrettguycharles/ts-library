import { FindQueryOptions, SearchQuery } from "../../QueryOptions";
import { AbstractRequest, IResponse } from "./HttpRequestResponse";
export declare abstract class PayloadRequest<T> extends AbstractRequest {
    payload: T;
    withPayload<C extends PayloadRequest<T>>(this: C, payload: T): C;
    abstract getDefaultPayload(): T;
}
export declare abstract class FindOptionsRequest extends AbstractRequest {
    options: FindQueryOptions;
    withOptions(options: FindQueryOptions): FindOptionsRequest;
}
export declare abstract class SearchRequest extends AbstractRequest {
    query: SearchQuery;
    options: FindQueryOptions;
    withQuery(query: SearchQuery): SearchRequest;
    withOptions(options: FindQueryOptions): SearchRequest;
}
export declare abstract class StringCarrierRequest extends AbstractRequest {
    payload: string;
    withPayload<C extends StringCarrierRequest>(this: C, payload: string): C;
}
export declare class AbstractArrayCarrierResponse<T> implements IResponse {
    payload: T[];
    withPayload<C extends AbstractArrayCarrierResponse<T>>(this: C, payload: T[]): C;
}
export declare class PayloadResponse<T> implements IResponse {
    payload?: T;
    withPayload(payload: T): this;
}
//# sourceMappingURL=AbstractReqResTypes.d.ts.map