import { Entity } from "../entities/Entity";
export declare class AuthToken extends Entity {
    id: string;
    timestamp: number;
    user_id: string;
    withTimestamp(timestamp: number): AuthToken;
    withUserId(user_id: string): AuthToken;
}
//# sourceMappingURL=AuthToken.d.ts.map