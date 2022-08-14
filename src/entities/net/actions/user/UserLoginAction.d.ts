import { Action } from "../abstract/Action";
import { User } from "../../../User";
import { AbstractRequest, IResponse } from "../abstract/HttpRequestResponse";
export declare class UserLoginRequest extends AbstractRequest {
    email: string;
    password: string;
}
export declare class UserLoginResponse implements IResponse {
    user: User;
    authtoken: string;
}
export declare class UserLoginAction implements Action<UserLoginRequest, UserLoginResponse> {
    blankRequest(): UserLoginRequest;
    blankResponse(): UserLoginResponse;
}
//# sourceMappingURL=UserLoginAction.d.ts.map