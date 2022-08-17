export declare class HttpRequest<PayloadType = any> {
    authtoken: string;
    user_id: string;
    payload: PayloadType;
    withPayload(payload: PayloadType): this;
    from<T extends HttpRequest>(this: T, other: any): T;
}
export declare class HttpResponse<BodyType = any> {
    cookies: {
        [key: string]: string;
    };
    cookiesToDelete: Set<string>;
    body: BodyType;
    withBody(body: BodyType): this;
    withCookie(key: string, value: string): this;
    deleteCookie(key: string): this;
}
//# sourceMappingURL=HttpRequestResponse.d.ts.map