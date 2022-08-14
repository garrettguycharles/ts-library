import {Action} from "../abstract/Action";
import {IUser, User} from "../../../User";
import {AbstractRequest, IResponse} from "../abstract/HttpRequestResponse";

export class RegisterRequest extends AbstractRequest {
    email = "";
    password = "";
    given_name = "";
    family_name = "";
    avatar = "";

    /**
     * Public constructor
     *
     * @param email the email of the user who wishes to create an account
     * @param password the new user's password
     * @param name the new user's name
     * @param phone the new user's phone
     * @param avatar the new user's profile picture
     */

    withEmail(email: string): RegisterRequest {
        this.email = email;
        return this;
    }

    withPassword(p: string): RegisterRequest {
        this.password = p;
        return this;
    }

    withGivenName(fn: string): RegisterRequest {
        this.given_name = fn;
        return this;
    }

    withFamilyName(ln: string): RegisterRequest {
        this.family_name = ln;
        return this;
    }

    withAvatar(src: string): RegisterRequest {
        this.avatar = src;
        return this;
    }
}

export class RegisterResponse implements IResponse {
    user: IUser = new User();
    authtoken = "";
}

export class RegisterUserAction implements Action<RegisterRequest, RegisterResponse> {
    blankRequest(): RegisterRequest {
        return new RegisterRequest();
    }

    blankResponse(): RegisterResponse {
        return new RegisterResponse();
    }
}