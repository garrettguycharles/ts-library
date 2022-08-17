"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityUtils = void 0;
const functions_1 = require("./functions");
const uuid_1 = require("uuid");
const argon2_1 = __importDefault(require("argon2"));
class SecurityUtils {
    static generateSalt() {
        let toReturn = this.generateUUID();
        toReturn += this.generateUUID();
        while (toReturn.length > 32) {
            const i = (0, functions_1.random_range)(1, toReturn.length - 2);
            toReturn = toReturn.substring(0, i) + toReturn.substring(i + 1);
        }
        return toReturn;
    }
    static async generateHash(pwd, salt) {
        const hash = await argon2_1.default.hash(pwd + salt);
        return hash;
    }
    static async verifyHash(pwd, salt, hash) {
        return await argon2_1.default.verify(hash, pwd + salt);
    }
    static generateUUID() {
        return (0, uuid_1.v4)();
    }
    static encodeString64(s) {
        return Buffer.from(s, "utf8").toString("base64");
    }
    static decodeString64(b64) {
        return Buffer.from(b64, "base64").toString("utf8");
    }
    static makeSessionId(user_id, authtoken) {
        return this.encodeString64(JSON.stringify({
            user_id: user_id,
            authtoken: authtoken
        }));
    }
    static readSessionId(sid) {
        try {
            return JSON.parse(this.decodeString64(sid));
        }
        catch (e) {
            return { user_id: "", authtoken: "" };
        }
    }
}
exports.SecurityUtils = SecurityUtils;
//# sourceMappingURL=SecurityUtils.js.map