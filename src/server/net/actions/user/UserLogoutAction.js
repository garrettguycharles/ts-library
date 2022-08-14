"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogoutAction = exports.UserLogoutResponse = exports.UserLogoutRequest = void 0;
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
class UserLogoutRequest extends HttpRequestResponse_1.AbstractRequest {
}
exports.UserLogoutRequest = UserLogoutRequest;
class UserLogoutResponse {
}
exports.UserLogoutResponse = UserLogoutResponse;
class UserLogoutAction {
    blankRequest() {
        return new UserLogoutRequest();
    }
    blankResponse() {
        return new UserLogoutResponse();
    }
}
exports.UserLogoutAction = UserLogoutAction;
//# sourceMappingURL=UserLogoutAction.js.map