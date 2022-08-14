"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersAction = exports.GetUsersResponse = exports.GetUsersRequest = void 0;
const HttpRequestResponse_1 = require("../abstract/HttpRequestResponse");
class GetUsersRequest extends HttpRequestResponse_1.AbstractRequest {
}
exports.GetUsersRequest = GetUsersRequest;
class GetUsersResponse {
    payload = [];
}
exports.GetUsersResponse = GetUsersResponse;
class GetUsersAction {
    blankRequest() {
        return new GetUsersRequest();
    }
    blankResponse() {
        return new GetUsersResponse();
    }
}
exports.GetUsersAction = GetUsersAction;
//# sourceMappingURL=GetUsersAction.js.map