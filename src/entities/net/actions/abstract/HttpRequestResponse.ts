export interface IRequest {
    user_id: string;
    authtoken: string
}

export abstract class AbstractRequest implements IRequest {
    authtoken = "";
    user_id = "";

    from<T extends AbstractRequest>(this: T, other: any): T {
        const defaultImplementation= this.getDefaultImplementation();
        const validKeys = Array.from(Object.keys(defaultImplementation));

        for (const key of validKeys) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (typeof defaultImplementation[key].getDefaultImplementation === 'function'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                && typeof defaultImplementation[key].from === 'function') {
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

    public getDefaultImplementation<T extends AbstractRequest>(this: T): T {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new this.constructor() as T;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponse {
}

class PayloadResponse<PayloadType> implements IResponse {
    payload: PayloadType;

    constructor(payload: PayloadType) {
        this.payload = payload;
    }
}