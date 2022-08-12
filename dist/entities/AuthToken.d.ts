import { Entity, IEntity } from "./Entity";
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
export declare class AuthToken extends Entity<IAuthToken> implements IAuthToken {
    timestamp: number;
    user_id: string;
    withTimestamp(timestamp: number): AuthToken;
    withUserId(user_id: string): AuthToken;
}
//# sourceMappingURL=AuthToken.d.ts.map