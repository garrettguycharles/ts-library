export interface IAuthentication<T> {
    payload: T;
}
export declare class Authentication<T> implements IAuthentication<T> {
    payload: T;
    withPayload<C extends IAuthentication<T>>(this: C, payload: T): C;
}
//# sourceMappingURL=Authentication.d.ts.map