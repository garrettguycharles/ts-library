import { ISecureUser } from "../../User";
import { Authentication, IAuthentication } from "../../http/abstract/Authentication";
import { IAuthToken } from "../../AuthToken";
export interface IVerifiedEntityPackage {
    user: ISecureUser;
}
export declare class VerifiedEntityPackage implements IVerifiedEntityPackage {
    user: ISecureUser;
    withUser<C extends VerifiedEntityPackage>(this: C, user: ISecureUser): C;
}
export interface ISecurityClearance<AuthType, EntityPackageType extends IVerifiedEntityPackage | void> {
    verifyUserClearance(authentication: IAuthentication<AuthType>): Promise<EntityPackageType> | EntityPackageType;
}
export declare abstract class NoSecurityClearance implements ISecurityClearance<void, void> {
    verifyUserClearance(authentication: Authentication<undefined>): void;
}
export declare abstract class AuthtokenSecurityClearance<EntityPackageType extends IVerifiedEntityPackage> implements ISecurityClearance<IAuthToken, EntityPackageType> {
    verifyUserClearance(authentication: Authentication<IAuthToken>): Promise<EntityPackageType>;
    abstract packageEntities_orThrowError(secureUser: ISecureUser): Promise<EntityPackageType> | EntityPackageType;
}
//# sourceMappingURL=SecurityClearance.d.ts.map