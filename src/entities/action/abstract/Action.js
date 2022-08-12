"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const Request_1 = require("../../http/abstract/Request");
const Response_1 = require("../../http/abstract/Response");
class Action {
    blankRequest() {
        return new Request_1.HttpRequest();
    }
    blankResponse() {
        return new Response_1.HttpResponse();
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map