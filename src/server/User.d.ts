import { Entity } from "../entities/Entity";
export declare class User extends Entity {
    email: string;
    family_name: string;
    given_name: string;
    avatar: string;
    withEmail(email: string): this;
    withGivenName(name: string): this;
    withFamilyName(name: string): this;
    withAvatar(url: string): this;
}
export declare class SecureUser extends User {
    hash: string;
    salt: string;
    roles: string[];
    tags: string[];
    withHash(hash: string): SecureUser;
    withSalt(salt: string): SecureUser;
    withRoles(roles: string[]): SecureUser;
}
//# sourceMappingURL=User.d.ts.map