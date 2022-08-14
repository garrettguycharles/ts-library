"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserAction = exports.RegisterResponse = exports.RegisterRequest = void 0;
const User_1 = require("../../../User");
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
class RegisterRequest extends HttpRequestResponse_1.AbstractRequest {
    email = "";
    password = "";
    given_name = "";
    family_name = "";
    avatar = "";
    withEmail(email) {
        this.email = email;
        return this;
    }
    withPassword(p) {
        this.password = p;
        return this;
    }
    withGivenName(fn) {
        this.given_name = fn;
        return this;
    }
    withFamilyName(ln) {
        this.family_name = ln;
        return this;
    }
    withAvatar(src) {
        this.avatar = src;
        return this;
    }
}
exports.RegisterRequest = RegisterRequest;
class RegisterResponse {
    user = new User_1.User();
    authtoken = "";
}
exports.RegisterResponse = RegisterResponse;
class RegisterUserAction {
    blankRequest() {
        return new RegisterRequest();
    }
    blankResponse() {
        return new RegisterResponse();
    }
}
exports.RegisterUserAction = RegisterUserAction;
//# sourceMappingURL=RegisterUserAction.js.map