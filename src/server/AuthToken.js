"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const Entity_1 = require("../entities/Entity");
const SecurityUtils_1 = require("../utils/SecurityUtils");
class AuthToken extends Entity_1.Entity {
    id = SecurityUtils_1.SecurityUtils.generateUUID();
    timestamp = 0;
    user_id = "";
    withTimestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    withUserId(user_id) {
        this.user_id = user_id;
        return this;
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=AuthToken.js.map