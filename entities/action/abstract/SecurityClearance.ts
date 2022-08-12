import {ISecureUser, SecureUser} from "../../User";
import {Authentication, IAuthentication} from "../../http/abstract/Authentication";
import {AuthToken, IAuthToken} from "../../AuthToken";

export interface IVerifiedEntityPackage {
    user: ISecureUser;
}

export class VerifiedEntityPackage implements IVerifiedEntityPackage {
    user!: ISecureUser;

    withUser<C extends VerifiedEntityPackage>(this: C, user: ISecureUser): C {
        this.user = user;
        return this;
    }
}

export interface ISecurityClearance<AuthType, EntityPackageType extends IVerifiedEntityPackage | void> {
    verifyUserClearance(authentication: IAuthentication<AuthType>): Promise<EntityPackageType> | EntityPackageType;
}

export abstract class NoSecurityClearance implements ISecurityClearance<void, void> {
    verifyUserClearance(authentication: Authentication<undefined>): void {}
}

export abstract class AuthtokenSecurityClearance<EntityPackageType extends IVerifiedEntityPackage>
    implements ISecurityClearance<IAuthToken, EntityPackageType> {
    async verifyUserClearance(authentication: Authentication<IAuthToken>): Promise<EntityPackageType> {
        const token = new AuthToken().from(authentication.payload);
        // TODO: get secure user using authentication.payload
        const user = new SecureUser();

        return this.packageEntities_orThrowError(user);
    }

    /**
     * Throw an error to disallow the user.
     * @param secureUser
     */
    abstract packageEntities_orThrowError(secureUser: ISecureUser): Promise<EntityPackageType> | EntityPackageType;
}