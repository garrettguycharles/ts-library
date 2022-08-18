import {HttpRequest, HttpResponse} from "../request-response/HttpRequestResponse";
import {SearchQuery} from "../../daos/abstract/Dao";
import {SecureUser, User} from "../User";
import {Server} from "../Server";
import {HttpRequestHandler} from "../handler/HttpRequestHandler";
import {SecurityUtils} from "../../utils/SecurityUtils";
import {AuthToken} from "../AuthToken";
import {BadRequestError, UnauthenticatedError} from "../error/PrefixedErrors";
import {DaoProvider} from "../../daos/DaoProvider";

export class RegisterRequest extends HttpRequest {
    email: string = "";
    password: string = "";
    given_name: string = "";
    family_name: string = "";
}

class RegisterHandler implements HttpRequestHandler<RegisterRequest, HttpResponse<undefined>> {
    constructRequest(body: any, params: { [p: string]: string }): RegisterRequest {
        return new RegisterRequest().from(body).from(params);
    }

    async handle(request: RegisterRequest): Promise<HttpResponse<undefined>> {
        const foundUser = await DaoProvider.getUserDao().findBySearch([
            new SearchQuery().withHashPath("email")
                .withQuery(request.email)
        ]);

        if (foundUser[0].payload.length) {
            throw new BadRequestError("There is already an account with that email.");
        }

        const newUser = new SecureUser()
            .withEmail(request.email)
            .withGivenName(request.given_name)
            .withFamilyName(request.family_name)
            .withId(SecurityUtils.generateUUID())
            .withSalt(SecurityUtils.generateSalt());

        newUser.withHash(await SecurityUtils.generateHash(request.password, newUser.salt));

        await DaoProvider.getUserDao().insert(newUser);

        const newAuthToken = new AuthToken().withId(SecurityUtils.generateUUID()).withUserId(newUser.id);

        await DaoProvider.getAuthTokenDao().insert(newAuthToken);

        return new HttpResponse<undefined>().withCookie("sessionid", SecurityUtils.makeSessionId(newUser.id, newAuthToken.id));
    }
}

export class LoginRequest extends HttpRequest {
    email: string = "";
    password: string = "";
}

class LoginHandler implements HttpRequestHandler<LoginRequest, HttpResponse<undefined>> {
    async constructRequest(body: any, params: { [p: string]: string }): Promise<LoginRequest> {
        return new LoginRequest().from(body).from(params);
    }

    async handle(request: LoginRequest): Promise<HttpResponse<undefined>> {
        const foundUser = await DaoProvider.getUserDao().findBySearch([
            new SearchQuery().withHashPath("email")
                .withQuery(request.email.trim())
                .withExact(true)
        ]);

        if (!foundUser[0].payload.length) {
            throw new BadRequestError("Email or password is incorrect.");
        }

        const user = new SecureUser().from(foundUser[0].payload[0]);

        const isCorrectPassword = await SecurityUtils.verifyHash(request.password, user.salt, user.hash);

        if (!isCorrectPassword) {
            throw new BadRequestError("Email or password is incorrect.");
        }

        const newAuthToken = new AuthToken().withId(SecurityUtils.generateUUID()).withUserId(user.id);

        await DaoProvider.getAuthTokenDao().insert(newAuthToken);

        return new HttpResponse<undefined>().withCookie('sessionid', SecurityUtils.makeSessionId(user.id, newAuthToken.id));
    }
}

class GetUserHandler implements HttpRequestHandler<HttpRequest, HttpResponse<User>> {
    async constructRequest(body: any, params: { [p: string]: string }): Promise<HttpRequest> {
        return new HttpRequest().from(body).from(params);
    }

    async handle(request: HttpRequest): Promise<HttpResponse<User>> {
        const knownAuthToken = await DaoProvider.getAuthTokenDao().findOneById(request.authtoken);

        if (!knownAuthToken) {
            throw new UnauthenticatedError("please log in again.");
        }

        const user = await DaoProvider.getUserDao().findOneById(knownAuthToken.user_id);

        if (!user) {
            throw new UnauthenticatedError("please log in again.");
        }

        return new HttpResponse<User>().withBody(new User().from(user));
    }
}

class LogoutHandler implements HttpRequestHandler<HttpRequest, HttpResponse<undefined>> {
    async constructRequest(body: any, params: { [p: string]: string }): Promise<HttpRequest> {
        return new HttpRequest().from(body).from(params);
    }

    async handle(request: HttpRequest): Promise<HttpResponse<undefined>> {
        const authToken = await DaoProvider.getAuthTokenDao().findOneById(request.authtoken);

        if (authToken) {
            await DaoProvider.getAuthTokenDao().delete(authToken.id);
        }

        return new HttpResponse<undefined>().deleteCookie('sessionid');
    }
}

const QuickstartServer = new Server("/api");

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

export {QuickstartServer};