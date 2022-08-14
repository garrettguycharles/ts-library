import {Action} from "../abstract/Action";
import {AbstractRequest} from "../abstract/HttpRequestResponse";
import {PayloadResponse} from "../abstract/AbstractReqResTypes";

export class UserVerifyEmailRequest extends AbstractRequest {}

export class UserVerifyEmailResponse extends PayloadResponse<string> {}

export class UserVerifyEmailAction
    implements Action<UserVerifyEmailRequest, UserVerifyEmailResponse> {
    blankRequest(): UserVerifyEmailRequest {
        return new UserVerifyEmailRequest();
    }
    
    blankResponse(): UserVerifyEmailResponse {
        return new UserVerifyEmailResponse();
    }    
}
