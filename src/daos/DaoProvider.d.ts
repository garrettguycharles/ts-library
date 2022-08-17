import { SecureUser } from "../server/User";
import { Dao } from "./abstract/Dao";
import { AuthToken } from "../server/AuthToken";
export declare class DaoProvider {
    protected static userDao: Dao<SecureUser>;
    static getUserDao(): Dao<SecureUser>;
    static setUserDao(userDao: Dao<SecureUser>): void;
    protected static authTokenDao: Dao<AuthToken>;
    static getAuthTokenDao(): Dao<AuthToken>;
    static setAuthTokenDao(authTokenDao: Dao<AuthToken>): void;
}
//# sourceMappingURL=DaoProvider.d.ts.map