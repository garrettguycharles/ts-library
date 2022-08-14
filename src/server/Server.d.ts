import express, { Express, Request, Response, Router } from "express";
import 'express-async-errors';
import { IRequest, IResponse } from "../entities/net/actions/abstract/HttpRequestResponse";
export declare class Server {
    app: Express;
    router: Router;
    constructor();
    use(path: string, router: express.Router): void;
    get(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    post(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    start(port?: string | number): void;
}
export interface IRequestHandler<RequestType extends IRequest, ResponseType extends IResponse> {
    handle(request: RequestType): ResponseType;
    constructRequest(body: any, params: {
        [key: string]: string;
    }): RequestType;
}
//# sourceMappingURL=Server.d.ts.map