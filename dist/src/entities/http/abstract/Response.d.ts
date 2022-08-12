export interface IHttpResponse<P> {
    payload: P;
}
export declare class HttpResponse<P> implements IHttpResponse<P> {
    payload: P;
    withPayload<C extends IHttpResponse<P>>(this: C, payload: P): C;
}
//# sourceMappingURL=Response.d.ts.map