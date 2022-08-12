"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
class HttpRequest {
    payload;
    authentication;
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
    withAuthentication(authentication) {
        this.authentication = authentication;
        return this;
    }
}
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=Request.js.map