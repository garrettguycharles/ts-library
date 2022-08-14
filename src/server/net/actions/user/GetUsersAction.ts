import {Action} from "../abstract/Action";
import {AbstractRequest, IResponse} from "../abstract/HttpRequestResponse";
import {IUser} from "../../../User";

export class GetUsersRequest extends AbstractRequest {
}

export class GetUsersResponse implements IResponse {
    payload: IUser[] = [];
}

export class GetUsersAction
    implements Action<GetUsersRequest, GetUsersResponse> {
    blankRequest(): GetUsersRequest {
        return new GetUsersRequest();
    }

    blankResponse(): GetUsersResponse {
        return new GetUsersResponse();
    }
}