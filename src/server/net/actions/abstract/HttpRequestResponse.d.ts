export interface IRequest {
    user_id: string;
    authtoken: string;
}
export declare abstract class AbstractRequest implements IRequest {
    authtoken: string;
    user_id: string;
    from<T extends AbstractRequest>(this: T, other: any): T;
    getDefaultImplementation<T extends AbstractRequest>(this: T): T;
}
export interface IResponse {
}
//# sourceMappingURL=HttpRequestResponse.d.ts.map