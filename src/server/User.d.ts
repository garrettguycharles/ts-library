import { Entity, IEntity } from "../entities/Entity";
export interface IUser extends IEntity {
    email: string;
    given_name: string;
    family_name: string;
    avatar: string;
}
export interface ISecureUser extends IUser {
    hash: string;
    salt: string;
    roles: string[];
    tags: string[];
}
export declare class User extends Entity<IUser> implements IUser {
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
    roles: string[];
    tags: string[];
    withHash(hash: string): SecureUser;
    withSalt(salt: string): SecureUser;
    withRoles(roles: string[]): SecureUser;
}
export declare const TAGS: {
    VENDOR: string;
};
//# sourceMappingURL=User.d.ts.map