import {HttpRequest, IHttpRequest} from "../../http/abstract/Request";
import {HttpResponse, IHttpResponse} from "../../http/abstract/Response";

export class Action<AuthType, ReqPayloadType, ResPayloadType> {
    blankRequest(): IHttpRequest<AuthType, ReqPayloadType> {
        return new HttpRequest<AuthType, ReqPayloadType>();
    }

    blankResponse(): IHttpResponse<ResPayloadType> {
        return new HttpResponse<ResPayloadType>();
    }
}