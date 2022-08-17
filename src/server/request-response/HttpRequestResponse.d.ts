export declare class HttpRequest {
    authtoken: string;
    user_id: string;
    from<T extends HttpRequest>(this: T, other: any): T;
}
export declare class HttpResponse<BodyType> {
    cookies: {
        [key: string]: string;
    };
    cookiesToDelete: Set<string>;
    body?: BodyType;
    withBody(body: BodyType): this;
    withCookie(key: string, value: string): this;
    deleteCookie(key: string): this;
}
//# sourceMappingURL=HttpRequestResponse.d.ts.map