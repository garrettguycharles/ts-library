import { ISearchableEntity, SearchableEntity } from "./Entity";
export interface IUser extends ISearchableEntity {
    email: string;
    given_name: string;
    family_name: string;
    avatar: string;
}
export interface ISecureUser extends IUser {
    hash: string;
    salt: string;
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