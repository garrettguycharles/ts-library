import express, {Express, NextFunction, Request, RequestHandler, Response, Router} from "express";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import {SecurityUtils} from "../utils/SecurityUtils";
import {Logger} from "../logging/Logger";
import {isPrefixedError, PrefixedError} from "../entities/net/error/abstract/PrefixedError";
import {AbstractRequest, IRequest, IResponse} from "../entities/net/actions/abstract/HttpRequestResponse";
import {PayloadResponse} from "../entities/net/actions/abstract/AbstractReqResTypes";

export class Server {
    app: Express;
    router: Router;

    constructor() {
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
        this.app.use('/', this.router);

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

    start(port = process.env.PORT || 3000) {
        this.app.listen(port, () => {
            new Logger().log("Server Start", `Listening on port ${port}`)
        });
    }
}

export interface IRequestHandler<RequestType extends IRequest, ResponseType extends IResponse> {
    handle(request: RequestType): ResponseType;
    constructRequest(body: any, params: {[key: string]: string}): RequestType;
}

const quickHandleRequest = async function (
    req: Request, res: Response,
    handler: IRequestHandler<any, any>
): Promise<any> {
    // @ts-ignore
    const request = handler.constructRequest(req.body, req.params);
    const response = handler.handle(request);

    return res.status(200).send(response);
}

