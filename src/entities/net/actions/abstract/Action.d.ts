import { IRequest, IResponse } from "./HttpRequestResponse";
export interface Action<T extends IRequest, V extends IResponse> {
    blankRequest(): T;
    blankResponse(): V;
}
//# sourceMappingURL=Action.d.ts.map