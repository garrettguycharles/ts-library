export interface IHttpResponse<P> {
    payload: P;
}

export class HttpResponse<P> implements IHttpResponse<P> {
    payload!: P;

    withPayload<C extends IHttpResponse<P>>(this: C, payload: P): C {
        this.payload = payload;
        return this;
    }
}