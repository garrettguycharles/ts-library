import {Action} from "../abstract/Action";
import {AbstractRequest, IResponse} from "../abstract/HttpRequestResponse";

export class UserUpdateRolesRequest extends AbstractRequest {
    /**
     * The id of the user to apply changes to
     */
    target = "";

    /**
     * Ids of roles to grant
     */
    grant: string[] = [];

    /**
     * Ids of roles to revoke
     */
    revoke: string[] = [];
}

export class UserUpdateRolesResponse implements IResponse {}

export class UserUpdateRolesAction
    implements Action<UserUpdateRolesRequest, UserUpdateRolesResponse> {
    blankRequest(): UserUpdateRolesRequest {
        return new UserUpdateRolesRequest();
    }
    
    blankResponse(): UserUpdateRolesResponse {
        return new UserUpdateRolesResponse();
    }    
}
