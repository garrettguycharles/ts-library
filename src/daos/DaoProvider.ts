import {SecureUser} from "../server/User";
import {Dao} from "./abstract/Dao";
import {MockDao} from "./abstract/MockDB";
import {AuthToken} from "../server/AuthToken";

export class DaoProvider {
    protected static userDao: Dao<SecureUser> = new MockDao<SecureUser>();

    public static getUserDao(): Dao<SecureUser> {
        return this.userDao;
    }
    public static setUserDao(userDao: Dao<SecureUser>): void {
        this.userDao = userDao;
    }



    protected static authTokenDao: Dao<AuthToken> = new MockDao<AuthToken>();

    public static getAuthTokenDao(): Dao<AuthToken> {
        return this.authTokenDao;
    }
    public static setAuthTokenDao(authTokenDao: Dao<AuthToken>): void {
        this.authTokenDao = authTokenDao;
    }
}