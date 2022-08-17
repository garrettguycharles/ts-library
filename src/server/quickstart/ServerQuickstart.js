"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickstartServer = exports.LoginRequest = exports.RegisterRequest = void 0;
const HttpRequestResponse_1 = require("../request-response/HttpRequestResponse");
const Dao_1 = require("../../daos/abstract/Dao");
const User_1 = require("../User");
const Server_1 = require("../Server");
const SecurityUtils_1 = require("../../utils/SecurityUtils");
const AuthToken_1 = require("../AuthToken");
const PrefixedErrors_1 = require("../error/PrefixedErrors");
const DaoProvider_1 = require("../../daos/DaoProvider");
class RegisterRequest extends HttpRequestResponse_1.HttpRequest {
    email = "";
    password = "";
    given_name = "";
    family_name = "";
}
exports.RegisterRequest = RegisterRequest;
class RegisterHandler {
    constructRequest(body, params) {
        return new RegisterRequest().from(body).from(params);
    }
    async handle(request) {
        const foundUser = await DaoProvider_1.DaoProvider.getUserDao().findBySearch([
            new Dao_1.SearchQuery().withHashPath("email")
                .withQuery(request.email)
        ]);
        if (foundUser[0].payload.length) {
            throw new PrefixedErrors_1.BadRequestError("There is already an account with that email.");
        }
        const newUser = new User_1.SecureUser()
            .withEmail(request.email)
            .withGivenName(request.given_name)
            .withFamilyName(request.family_name)
            .withId(SecurityUtils_1.SecurityUtils.generateUUID())
            .withSalt(SecurityUtils_1.SecurityUtils.generateSalt());
        newUser.withHash(await SecurityUtils_1.SecurityUtils.generateHash(request.password, newUser.salt));
        await DaoProvider_1.DaoProvider.getUserDao().insert(newUser);
        const newAuthToken = new AuthToken_1.AuthToken().withUserId(newUser.id);
        await DaoProvider_1.DaoProvider.getAuthTokenDao().insert(newAuthToken);
        return new HttpRequestResponse_1.HttpResponse().withCookie("sessionid", SecurityUtils_1.SecurityUtils.makeSessionId(newUser.id, newAuthToken.id));
    }
}
class LoginRequest extends HttpRequestResponse_1.HttpRequest {
    email = "";
    password = "";
}
exports.LoginRequest = LoginRequest;
class LoginHandler {
    async constructRequest(body, params) {
        return new LoginRequest().from(body).from(params);
    }
    async handle(request) {
        const foundUser = await DaoProvider_1.DaoProvider.getUserDao().findBySearch([
            new Dao_1.SearchQuery().withHashPath("email")
                .withQuery(request.email.trim())
                .withExact(true)
        ]);
        if (!foundUser[0].payload.length) {
            throw new PrefixedErrors_1.BadRequestError("Email or password is incorrect.");
        }
        const user = new User_1.SecureUser().from(foundUser[0].payload[0]);
        const isCorrectPassword = await SecurityUtils_1.SecurityUtils.verifyHash(request.password, user.salt, user.hash);
        if (!isCorrectPassword) {
            throw new PrefixedErrors_1.BadRequestError("Email or password is incorrect.");
        }
        const newAuthToken = new AuthToken_1.AuthToken().withUserId(user.id);
        await DaoProvider_1.DaoProvider.getAuthTokenDao().insert(newAuthToken);
        return new HttpRequestResponse_1.HttpResponse().withCookie('sessionid', SecurityUtils_1.SecurityUtils.makeSessionId(user.id, newAuthToken.id));
    }
}
class GetUserHandler {
    async constructRequest(body, params) {
        return new HttpRequestResponse_1.HttpRequest().from(body).from(params);
    }
    async handle(request) {
        const knownAuthToken = await DaoProvider_1.DaoProvider.getAuthTokenDao().findOneById(request.authtoken);
        if (!knownAuthToken) {
            throw new PrefixedErrors_1.UnauthenticatedError("please log in again.");
        }
        const user = await DaoProvider_1.DaoProvider.getUserDao().findOneById(knownAuthToken.user_id);
        if (!user) {
            throw new PrefixedErrors_1.UnauthenticatedError("please log in again.");
        }
        return new HttpRequestResponse_1.HttpResponse().withBody(new User_1.User().from(user));
    }
}
class LogoutHandler {
    async constructRequest(body, params) {
        return new HttpRequestResponse_1.HttpRequest().from(body).from(params);
    }
    async handle(request) {
        const authToken = await DaoProvider_1.DaoProvider.getAuthTokenDao().findOneById(request.authtoken);
        if (authToken) {
            await DaoProvider_1.DaoProvider.getAuthTokenDao().delete(authToken.id);
        }
        return new HttpRequestResponse_1.HttpResponse().deleteCookie('sessionid');
    }
}
const QuickstartServer = new Server_1.Server("/api");
exports.QuickstartServer = QuickstartServer;
QuickstartServer.post("/register", async (req, res) => {
    await QuickstartServer.quickHandle(req, res, new RegisterHandler());
});
QuickstartServer.post("/login", async (req, res) => {
    await QuickstartServer.quickHandle(req, res, new LoginHandler());
});
QuickstartServer.delete("/logout", async (req, res) => {
    await QuickstartServer.quickHandle(req, res, new LogoutHandler());
});
QuickstartServer.get("/user", async (req, res) => {
    await QuickstartServer.quickHandle(req, res, new GetUserHandler());
});
//# sourceMappingURL=ServerQuickstart.js.map