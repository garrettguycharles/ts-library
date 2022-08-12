import { ISearchableEntity, SearchableEntity } from "./Entity";
export interface IUser extends ISearchableEntity {
    /**
     * login email
     */
    email: string;
    /**
     * user's given name
     */
    given_name: string;
    /**
     * user's family name
     */
    family_name: string;
    /**
     * user's avatar image.
     */
    avatar: string;
}
export interface ISecureUser extends IUser {
    /**
     * stored password hash
     */
    hash: string;
    /**
     * stored password salt
     */
    salt: string;
    /**
     * User roles. This links users to their permissions.
     * (foreign key to IUserRole)
     */
    roles: string[];
    permissions: string[];
}
export declare class User extends SearchableEntity<IUser> implements IUser {
    email: string;
    family_name: string;
    given_name: string;
    avatar: string;
    withEmail<T extends IUser>(this: T, email: string): T;
    withGivenName<T extends IUser>(this: T, name: string): T;
    withFamilyName<T extends IUser>(this: T, name: string): T;
    withAvatar<T extends IUser>(this: T, url: string): T;
}
export declare class SecureUser extends User implements ISecureUser {
    hash: string;
    salt: string;
    permissions: string[];
    roles: string[];
    withHash(hash: string): SecureUser;
    withSalt(salt: string): SecureUser;
    withRoles(roles: string[]): SecureUser;
    withPermissions(permissions: string[]): SecureUser;
}
//# sourceMappingURL=User.d.ts.map