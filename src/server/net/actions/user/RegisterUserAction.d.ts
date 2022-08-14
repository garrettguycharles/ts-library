import { Action } from "../abstract/Action";
import { IUser } from "../../../User";
import { AbstractRequest, IResponse } from "../abstract/HttpRequestResponse";
export declare class RegisterRequest extends AbstractRequest {
    email: string;
    password: string;
    given_name: string;
    family_name: string;
    avatar: string;
    withEmail(email: string): RegisterRequest;
    withPassword(p: string): RegisterRequest;
    withGivenName(fn: string): RegisterRequest;
    withFamilyName(ln: string): RegisterRequest;
    withAvatar(src: string): RegisterRequest;
}
export declare class RegisterResponse implements IResponse {
    user: IUser;
    authtoken: string;
}
export declare class RegisterUserAction implements Action<RegisterRequest, RegisterResponse> {
    blankRequest(): RegisterRequest;
    blankResponse(): RegisterResponse;
}
//# sourceMappingURL=RegisterUserAction.d.ts.map