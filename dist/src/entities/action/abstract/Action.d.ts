import { IHttpRequest } from "../../http/abstract/Request";
import { IHttpResponse } from "../../http/abstract/Response";
export declare class Action<AuthType, ReqPayloadType, ResPayloadType> {
    blankRequest(): IHttpRequest<AuthType, ReqPayloadType>;
    blankResponse(): IHttpResponse<ResPayloadType>;
}
//# sourceMappingURL=Action.d.ts.map