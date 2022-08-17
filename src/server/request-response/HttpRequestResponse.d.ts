export declare class HttpRequest<PayloadType extends any = undefined> {
    authtoken: string;
    user_id: string;
    payload: PayloadType;
    withPayload(payload: PayloadType): this;
    from<T extends HttpRequest>(this: T, other: any): T;
}
export declare class HttpResponse<BodyType extends any = undefined> {
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