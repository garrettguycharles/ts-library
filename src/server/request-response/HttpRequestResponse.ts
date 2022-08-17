export class HttpRequest {
    authtoken = "";
    user_id = "";

    from<T extends HttpRequest>(this: T, other: any): T {
        // @ts-ignore
        const defaultImplementation = new this.constructor() as T;
        const validKeys = Array.from(Object.keys(defaultImplementation));

        for (const key of validKeys) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (defaultImplementation[key] instanceof HttpRequest) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this[key] = defaultImplementation[key].from(other[key]);
            } else {
                if (other[key] !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this[key] = other[key];
                }
            }
        }
        return this;
    }
}

export class HttpResponse<BodyType> {
    cookies: {[key: string]: string} = {};
    cookiesToDelete = new Set<string>();
    body?: BodyType;

    withBody(body: BodyType): this {
        this.body = body;
        return this;
    }

    withCookie(key: string, value: string): this {
        this.cookies[key] = value;
        return this;
    }

    deleteCookie(key: string): this {
        this.cookiesToDelete.add(key);
        return this;
    }
}