import { Action } from "../abstract/Action";
import { AbstractRequest, IResponse } from "../abstract/HttpRequestResponse";
export declare class UserUpdateRolesRequest extends AbstractRequest {
    target: string;
    grant: string[];
    revoke: string[];
}
export declare class UserUpdateRolesResponse implements IResponse {
}
export declare class UserUpdateRolesAction implements Action<UserUpdateRolesRequest, UserUpdateRolesResponse> {
    blankRequest(): UserUpdateRolesRequest;
    blankResponse(): UserUpdateRolesResponse;
}
//# sourceMappingURL=UserUpdateRolesAction.d.ts.map