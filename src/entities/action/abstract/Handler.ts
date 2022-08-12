import {IHttpResponse} from "../../http/abstract/Response";
import {IHttpRequest} from "../../http/abstract/Request";
import {ISecurityClearance, IVerifiedEntityPackage} from "./SecurityClearance";

export interface IActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType extends IVerifiedEntityPackage> {
    handleRequest(req: IHttpRequest<AuthType, ReqPayloadType>): IHttpResponse<ResPayloadType> | Promise<IHttpResponse<ResPayloadType>>;
    provideRequiredClearance(): ISecurityClearance<AuthType, EntityPackageType>;
}

export abstract class ActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType extends IVerifiedEntityPackage>
    implements IActionHandler<AuthType, ReqPayloadType, ResPayloadType, EntityPackageType> {

    async handleRequest(req: IHttpRequest<AuthType, ReqPayloadType>): Promise<IHttpResponse<ResPayloadType>> {
        const verifiedEntities = await this.provideRequiredClearance().verifyUserClearance(req.authentication);

        return this.handleRequestAfterClearance(req, verifiedEntities);
    }

    abstract provideRequiredClearance(): ISecurityClearance<AuthType, EntityPackageType>;
    abstract handleRequestAfterClearance(
        req: IHttpRequest<AuthType, ReqPayloadType>,
        verifiedEntities: EntityPackageType
    ): IHttpResponse<ResPayloadType> | Promise<IHttpResponse<ResPayloadType>>;
}