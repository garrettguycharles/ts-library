"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerifyEmailAction = exports.UserVerifyEmailResponse = exports.UserVerifyEmailRequest = void 0;
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
const AbstractReqResTypes_1 = require("../abstract/AbstractReqResTypes");
class UserVerifyEmailRequest extends HttpRequestResponse_1.AbstractRequest {
}
exports.UserVerifyEmailRequest = UserVerifyEmailRequest;
class UserVerifyEmailResponse extends AbstractReqResTypes_1.PayloadResponse {
}
exports.UserVerifyEmailResponse = UserVerifyEmailResponse;
class UserVerifyEmailAction {
    blankRequest() {
        return new UserVerifyEmailRequest();
    }
    blankResponse() {
        return new UserVerifyEmailResponse();
    }
}
exports.UserVerifyEmailAction = UserVerifyEmailAction;
//# sourceMappingURL=UserVerifyEmailAction.js.map