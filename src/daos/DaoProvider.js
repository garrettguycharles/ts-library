"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoProvider = void 0;
const MockDB_1 = require("./abstract/MockDB");
class DaoProvider {
    static userDao = new MockDB_1.MockDao();
    static getUserDao() {
        return this.userDao;
    }
    static setUserDao(userDao) {
        this.userDao = userDao;
    }
    static authTokenDao = new MockDB_1.MockDao();
    static getAuthTokenDao() {
        return this.authTokenDao;
    }
    static setAuthTokenDao(authTokenDao) {
        this.authTokenDao = authTokenDao;
    }
}
exports.DaoProvider = DaoProvider;
//# sourceMappingURL=DaoProvider.js.map