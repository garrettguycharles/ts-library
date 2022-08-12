export interface IAuthentication<T> {
    payload: T;
}

export class Authentication<T> implements IAuthentication<T> {
    payload!: T;

    withPayload<C extends IAuthentication<T>>(this: C, payload: T): C {
        this.payload = payload;
        return this;
    }
}