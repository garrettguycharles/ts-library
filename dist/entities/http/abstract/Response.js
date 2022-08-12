"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    payload;
    withPayload(payload) {
        this.payload = payload;
        return this;
    }
}
exports.HttpResponse = HttpResponse;
