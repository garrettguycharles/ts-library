import {Entity, IEntity} from "../entities/Entity";

export interface IAuthToken extends IEntity {
    /**
     * Unique string of characters.
     */
    id: string;

    /**
     * Long of date of creation/last use.
     */
    timestamp: number;

    /**
     * id of IUser who is authorized to use this token.
     */
    user_id: string;
}

export class AuthToken extends Entity<IAuthToken> implements IAuthToken {
    timestamp = 0;
    user_id = "";

    withTimestamp(timestamp: number): AuthToken {
        this.timestamp = timestamp;
        return this;
    }

    withUserId(user_id: string): AuthToken {
        this.user_id = user_id;
        return this;
    }
}