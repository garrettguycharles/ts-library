import { Entity, IEntity } from "./Entity";
export interface IAuthToken extends IEntity {
    id: string;
    timestamp: number;
    user_id: string;
}
export declare class AuthToken extends Entity<IAuthToken> implements IAuthToken {
    timestamp: number;
    user_id: string;
    withTimestamp(timestamp: number): AuthToken;
    withUserId(user_id: string): AuthToken;
}
//# sourceMappingURL=AuthToken.d.ts.map