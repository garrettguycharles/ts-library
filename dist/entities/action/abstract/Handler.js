"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHandler = void 0;
class ActionHandler {
    async handleRequest(req) {
        const verifiedEntities = await this.provideRequiredClearance().verifyUserClearance(req.authentication);
        return this.handleRequestAfterClearance(req, verifiedEntities);
    }
}
exports.ActionHandler = ActionHandler;
