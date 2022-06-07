import {Entity, IEntity} from "../../Entity";
import {IAuthentication} from "./Authentication";

export interface IHttpRequest<AuthType, PayloadType> {
    authentication: IAuthentication<AuthType>;
    payload: PayloadType;
}

export class HttpRequest<AuthType, PayloadType> implements IHttpRequest<AuthType, PayloadType> {
    payload!: PayloadType;
    authentication!: IAuthentication<AuthType>;

    withPayload<C extends HttpRequest<AuthType, PayloadType>>(this: C, payload: PayloadType): C {
        this.payload = payload;
        return this;
    }

    withAuthentication<C extends HttpRequest<AuthType, PayloadType>>(this: C, authentication: IAuthentication<AuthType>) {
        this.authentication = authentication;
        return this;
    }
}