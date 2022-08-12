"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthtokenSecurityClearance = exports.NoSecurityClearance = exports.VerifiedEntityPackage = void 0;
const User_1 = require("../../User");
const AuthToken_1 = require("../../AuthToken");
class VerifiedEntityPackage {
    user;
    withUser(user) {
        this.user = user;
        return this;
    }
}
exports.VerifiedEntityPackage = VerifiedEntityPackage;
class NoSecurityClearance {
    verifyUserClearance(authentication) { }
}
exports.NoSecurityClearance = NoSecurityClearance;
class AuthtokenSecurityClearance {
    async verifyUserClearance(authentication) {
        const token = new AuthToken_1.AuthToken().from(authentication.payload);
        const user = new User_1.SecureUser();
        return this.packageEntities_orThrowError(user);
    }
}
exports.AuthtokenSecurityClearance = AuthtokenSecurityClearance;
//# sourceMappingURL=SecurityClearance.js.map