"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpRequest = void 0;
class HttpRequest {
    authtoken = "";
    user_id = "";
    from(other) {
        const defaultImplementation = new this.constructor();
        const validKeys = Array.from(Object.keys(defaultImplementation));
        for (const key of validKeys) {
            if (defaultImplementation[key] instanceof HttpRequest) {
                this[key] = defaultImplementation[key].from(other[key]);
            }
            else {
                if (other[key] !== undefined) {
                    this[key] = other[key];
                }
            }
        }
        return this;
    }
}
exports.HttpRequest = HttpRequest;
class HttpResponse {
    cookies = {};
    cookiesToDelete = new Set();
    body;
    withBody(body) {
        this.body = body;
        return this;
    }
    withCookie(key, value) {
        this.cookies[key] = value;
        return this;
    }
    deleteCookie(key) {
        this.cookiesToDelete.add(key);
        return this;
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=HttpRequestResponse.js.map