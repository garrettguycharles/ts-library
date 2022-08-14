"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRequest = void 0;
class AbstractRequest {
    authtoken = "";
    user_id = "";
    from(other) {
        const defaultImplementation = this.getDefaultImplementation();
        const validKeys = Array.from(Object.keys(defaultImplementation));
        for (const key of validKeys) {
            if (typeof defaultImplementation[key].getDefaultImplementation === 'function'
                && typeof defaultImplementation[key].from === 'function') {
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
    getDefaultImplementation() {
        return new this.constructor();
    }
}
exports.AbstractRequest = AbstractRequest;
class PayloadResponse {
    payload;
    constructor(payload) {
        this.payload = payload;
    }
}
//# sourceMappingURL=HttpRequestResponse.js.map