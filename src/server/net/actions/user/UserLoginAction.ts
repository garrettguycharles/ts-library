import {Action} from "../abstract/Action";
import {User} from "../../../User";
import {AbstractRequest, IResponse} from "../abstract/HttpRequestResponse";

export class UserLoginRequest extends AbstractRequest {
    email = "";
    password = "";
}

export class UserLoginResponse implements IResponse {
    user = new User();
    authtoken = "";
}

export class UserLoginAction
    implements Action<UserLoginRequest, UserLoginResponse> {
    blankRequest(): UserLoginRequest {
        return new UserLoginRequest();
    }
    
    blankResponse(): UserLoginResponse {
        return new UserLoginResponse();
    }    
}
