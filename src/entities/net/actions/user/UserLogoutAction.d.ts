import { Action } from "../abstract/Action";
import { AbstractRequest, IResponse } from "../abstract/HttpRequestResponse";
export declare class UserLogoutRequest extends AbstractRequest {
}
export declare class UserLogoutResponse implements IResponse {
}
export declare class UserLogoutAction implements Action<UserLogoutRequest, UserLogoutResponse> {
    blankRequest(): UserLogoutRequest;
    blankResponse(): UserLogoutResponse;
}
//# sourceMappingURL=UserLogoutAction.d.ts.map