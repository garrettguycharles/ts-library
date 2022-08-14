import {Action} from "../abstract/Action";
import {AbstractRequest, IResponse} from "../abstract/HttpRequestResponse";

export class UserLogoutRequest extends AbstractRequest {}

export class UserLogoutResponse implements IResponse {}

export class UserLogoutAction
    implements Action<UserLogoutRequest, UserLogoutResponse> {
    blankRequest(): UserLogoutRequest {
        return new UserLogoutRequest();
    }
    
    blankResponse(): UserLogoutResponse {
        return new UserLogoutResponse();
    }    
}
