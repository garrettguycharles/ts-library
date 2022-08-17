import { SecureUser } from "../server/User";
import { Dao } from "./abstract/Dao";
import { AuthToken } from "../server/AuthToken";
export declare class DaoProvider {
    private static userDao;
    static getUserDao(): Dao<SecureUser>;
    static setUserDao(userDao: Dao<SecureUser>): void;
    private static authTokenDao;
    static getAuthTokenDao(): Dao<AuthToken>;
    static setAuthTokenDao(authTokenDao: Dao<AuthToken>): void;
}
//# sourceMappingURL=DaoProvider.d.ts.map