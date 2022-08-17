import { HttpRequest, HttpResponse } from "../request-response/HttpRequestResponse";
export interface HttpRequestHandler<RequestType extends HttpRequest, ResponseType extends HttpResponse<any>> {
    handle(request: RequestType): ResponseType | Promise<ResponseType>;
    constructRequest(body: any, params: {
        [key: string]: string;
    }): RequestType | Promise<RequestType>;
}
//# sourceMappingURL=HttpRequestHandler.d.ts.map