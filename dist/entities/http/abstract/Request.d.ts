import { IAuthentication } from "./Authentication";
export interface IHttpRequest<AuthType, PayloadType> {
    authentication: IAuthentication<AuthType>;
    payload: PayloadType;
}
export declare class HttpRequest<AuthType, PayloadType> implements IHttpRequest<AuthType, PayloadType> {
    payload: PayloadType;
    authentication: IAuthentication<AuthType>;
    withPayload<C extends HttpRequest<AuthType, PayloadType>>(this: C, payload: PayloadType): C;
    withAuthentication<C extends HttpRequest<AuthType, PayloadType>>(this: C, authentication: IAuthentication<AuthType>): C;
}
//# sourceMappingURL=Request.d.ts.map