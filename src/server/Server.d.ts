/// <reference types="node" />
import express, { Express, Request, Response, Router } from "express";
import 'express-async-errors';
import { IRequest, IResponse } from "./net/actions/abstract/HttpRequestResponse";
export declare class Server {
    app: Express;
    router: Router;
    constructor();
    use(path: string, router: express.Router): void;
    get(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    post(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    start(port?: string | number): import("http").Server;
}
export interface IRequestHandler<RequestType extends IRequest, ResponseType extends IResponse> {
    handle(request: RequestType): ResponseType;
    constructRequest(body: any, params: {
        [key: string]: string;
    }): RequestType;
}
export declare const quickHandleRequest: (req: Request, res: Response, handler: IRequestHandler<any, any>) => Promise<any>;
//# sourceMappingURL=Server.d.ts.map