"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateRolesAction = exports.UserUpdateRolesResponse = exports.UserUpdateRolesRequest = void 0;
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
class UserUpdateRolesRequest extends HttpRequestResponse_1.AbstractRequest {
    target = "";
    grant = [];
    revoke = [];
}
exports.UserUpdateRolesRequest = UserUpdateRolesRequest;
class UserUpdateRolesResponse {
}
exports.UserUpdateRolesResponse = UserUpdateRolesResponse;
class UserUpdateRolesAction {
    blankRequest() {
        return new UserUpdateRolesRequest();
    }
    blankResponse() {
        return new UserUpdateRolesResponse();
    }
}
exports.UserUpdateRolesAction = UserUpdateRolesAction;
//# sourceMappingURL=UserUpdateRolesAction.js.map