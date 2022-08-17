import {Entity} from "../entities/Entity";
import {SecurityUtils} from "../utils/SecurityUtils";

export class AuthToken extends Entity {

    /**
     * Unique string of characters.
     */
    id = SecurityUtils.generateUUID();

    /**
     * Long of date of creation/last use.
     */
    timestamp = 0;

    /**
     * id of IUser who is authorized to use this token.
     */
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