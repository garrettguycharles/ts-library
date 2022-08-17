/// <reference types="node" />
import express, { Express, Request, Response, Router } from "express";
import 'express-async-errors';
import { HttpRequest, HttpResponse } from "./request-response/HttpRequestResponse";
import * as http from "http";
import { HttpRequestHandler } from "./handler/HttpRequestHandler";
export declare class Server {
    app: Express;
    runningInstance?: http.Server;
    router: Router;
    baseRouterPath: string;
    constructor(baseRouterPath?: string);
    use(path: string, router: express.Router): void;
    get(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    post(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    put(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    delete(path: string, handler: (req: Request, res: Response) => Promise<any>): this;
    start(port?: string | number): void;
    stop(): void;
    quickHandle<R extends HttpRequest, S extends HttpResponse<any>>(req: Request, res: Response, handler: HttpRequestHandler<R, S>): Promise<any>;
}
//# sourceMappingURL=Server.d.ts.map