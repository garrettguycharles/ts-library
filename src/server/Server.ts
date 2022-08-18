import express, {Express, NextFunction, Request, Response, Router} from "express";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import {SecurityUtils} from "../utils/SecurityUtils";
import {Logger} from "../logging/Logger";
import {PrefixedError} from "./error/abstract/PrefixedError";
import {HttpRequest, HttpResponse} from "./request-response/HttpRequestResponse";
import * as http from "http";
import {HttpRequestHandler} from "./handler/HttpRequestHandler";

export class Server {
    app: Express;
    runningInstance?: http.Server;
    router: Router;
    baseRouterPath: string;

    constructor(baseRouterPath = "/") {
        this.baseRouterPath = baseRouterPath;

        this.app = express();
        this.router = Router();

        this.app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());

        // Show routes called in console during development
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }

        // Security
        if (process.env.NODE_ENV === 'production') {
            this.app.use(helmet());
        }

        // parse auth cookies and place in body

        this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
            const sessionid = req.cookies.sessionid as string;

            if (sessionid) {
                const auth = SecurityUtils.readSessionId(sessionid);

                req.body.user_id = auth.user_id || "";
                req.body.authtoken = auth.authtoken || "";
            } else {
                req.body.user_id = "";
                req.body.authtoken = "";
            }

            next();
        });

        // add routes
        this.app.use(this.baseRouterPath, this.router);

        // catch/print errors
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            new Logger().error(err);

            if (err instanceof PrefixedError) {
                return res.status(err.getResponseCode()).json(err);
            }

            return res.status(400).json({
                error: err.message
            });
        });
    }

    use(path: string, router: express.Router) {
        this.router.use(path, router);
    }

    get(path: string, handler: (req: Request, res: Response) => Promise<any>): this {
        this.router.get(path, handler);
        return this;
    }

    post(path: string, handler: (req: Request, res: Response) => Promise<any>): this {
        this.router.post(path, handler);
        return this;
    }

    put(path: string, handler: (req: Request, res: Response) => Promise<any>): this {
        this.router.put(path, handler);
        return this;
    }

    delete(path: string, handler: (req: Request, res: Response) => Promise<any>): this {
        this.router.delete(path, handler);
        return this;
    }

    start(port = process.env.PORT || 3000): void {
        if (!this.runningInstance) {
            this.runningInstance = this.app.listen(port, () => {
                new Logger().log("Server Start", `Listening on port ${port}`);
            });
        }
    }

    stop(): void {
        if (this.runningInstance) {
            this.runningInstance.close();
            this.runningInstance = undefined;
        }
    }

    async quickHandle<R extends HttpRequest, S extends HttpResponse<any>>(
        req: Request, res: Response,
        handler: HttpRequestHandler<R, S>
    ): Promise<any> {
        const request = await handler.constructRequest(req.body, req.params, req.query as {[p: string]:string});
        const response = await handler.handle(request);

        const cookieOptions = {
            secure: process.env.NODE_ENV !== "development",
            path: this.baseRouterPath,
            httpOnly: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        };

        for (const [key, value] of Object.entries(response.cookies)) {
            res.cookie(key, value, cookieOptions);
        }

        for (const key of response.cookiesToDelete) {
            res.clearCookie(key);
        }

        if (response.body) {
            return res.status(200).send(response.body);
        } else {
            return res.sendStatus(200);
        }
    }
}