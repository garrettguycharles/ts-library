import { Action } from "../abstract/Action";
import { AbstractRequest } from "../abstract/HttpRequestResponse";
import { PayloadResponse } from "../abstract/AbstractReqResTypes";
export declare class UserVerifyEmailRequest extends AbstractRequest {
}
export declare class UserVerifyEmailResponse extends PayloadResponse<string> {
}
export declare class UserVerifyEmailAction implements Action<UserVerifyEmailRequest, UserVerifyEmailResponse> {
    blankRequest(): UserVerifyEmailRequest;
    blankResponse(): UserVerifyEmailResponse;
}
//# sourceMappingURL=UserVerifyEmailAction.d.ts.map