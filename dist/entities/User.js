"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureUser = exports.User = void 0;
const Entity_1 = require("./Entity");
class User extends Entity_1.SearchableEntity {
    email = "";
    family_name = "";
    given_name = "";
    avatar = "";
    withEmail(email) {
        this.email = email;
        return this;
    }
    withGivenName(name) {
        this.given_name = name;
        return this;
    }
    withFamilyName(name) {
        this.family_name = name;
        return this;
    }
    withAvatar(url) {
        this.avatar = url;
        return this;
    }
}
exports.User = User;
class SecureUser extends User {
    hash = "";
    salt = "";
    permissions = [];
    roles = [];
    withHash(hash) {
        this.hash = hash;
        return this;
    }
    withSalt(salt) {
        this.salt = salt;
        return this;
    }
    withRoles(roles) {
        this.roles = roles;
        return this;
    }
    withPermissions(permissions) {
        this.permissions = permissions;
        return this;
    }
}
exports.SecureUser = SecureUser;
//# sourceMappingURL=User.js.map