"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const Entity_1 = require("./Entity");
class AuthToken extends Entity_1.Entity {
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
