import { Action } from "../abstract/Action";
import { AbstractRequest, IResponse } from "../abstract/HttpRequestResponse";
import { IUser } from "../../../User";
export declare class GetUsersRequest extends AbstractRequest {
}
export declare class GetUsersResponse implements IResponse {
    payload: IUser[];
}
export declare class GetUsersAction implements Action<GetUsersRequest, GetUsersResponse> {
    blankRequest(): GetUsersRequest;
    blankResponse(): GetUsersResponse;
}
//# sourceMappingURL=GetUsersAction.d.ts.map