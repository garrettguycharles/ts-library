"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
class Authentication {
    payload;
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.Authentication = Authentication;
