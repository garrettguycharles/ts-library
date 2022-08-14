"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginAction = exports.UserLoginResponse = exports.UserLoginRequest = void 0;
const User_1 = require("../../../User");
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
class UserLoginRequest extends HttpRequestResponse_1.AbstractRequest {
    email = "";
    password = "";
}
exports.UserLoginRequest = UserLoginRequest;
class UserLoginResponse {
    user = new User_1.User();
    authtoken = "";
}
exports.UserLoginResponse = UserLoginResponse;
class UserLoginAction {
    blankRequest() {
        return new UserLoginRequest();
    }
    blankResponse() {
        return new UserLoginResponse();
    }
}
exports.UserLoginAction = UserLoginAction;
//# sourceMappingURL=UserLoginAction.js.map