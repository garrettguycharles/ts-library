import { IHttpResponse } from "../../http/abstract/Response";
import { IHttpRequest } from "../../http/abstract/Request";
import { ISecurityClearance, IVerifiedEntityPackage } from "./SecurityClearance";
export interface IActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType extends IVerifiedEntityPackage> {
    handleRequest(req: IHttpRequest<AuthType, ReqPayloadType>): IHttpResponse<ResPayloadType> | Promise<IHttpResponse<ResPayloadType>>;
    provideRequiredClearance(): ISecurityClearance<AuthType, EntityPackageType>;
}
export declare abstract class ActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType extends IVerifiedEntityPackage> implements IActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType> {
    handleRequest(req: IHttpRequest<AuthType, ReqPayloadType>): Promise<IHttpResponse<ResPayloadType>>;
    abstract provideRequiredClearance(): ISecurityClearance<AuthType, EntityPackageType>;
    abstract handleRequestAfterClearance(req: IHttpRequest<AuthType, ReqPayloadType>, verifiedEntities: EntityPackageType): IHttpResponse<ResPayloadType> | Promise<IHttpResponse<ResPayloadType>>;
}
//# sourceMappingURL=Handler.d.ts.map