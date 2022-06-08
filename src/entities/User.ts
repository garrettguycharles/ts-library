import {Entity, IEntity, ISearchableEntity, SearchableEntity} from "./Entity";
import {getAllStringBearingHashPaths} from "../utils/functions";

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

export class User extends SearchableEntity<IUser> implements IUser {
    email = "";
    family_name = "";
    given_name = "";
    avatar = "";

    withEmail<T extends IUser>(this: T, email: string): T {
        this.email = email;
        return this;
    }

    withGivenName<T extends IUser>(this: T, name: string): T {
        this.given_name = name;
        return this;
    }

    withFamilyName<T extends IUser>(this: T, name: string): T {
        this.family_name = name;
        return this;
    }

    withAvatar<T extends IUser>(this: T, url: string): T {
        this.avatar = url;
        return this;
    }
}

export class SecureUser extends User implements ISecureUser {
    hash = "";
    salt = "";
    permissions: string[] = [];
    roles: string[] = [];

    withHash(hash: string): SecureUser {
        this.hash = hash;
        return this;
    }

    withSalt(salt: string): SecureUser {
        this.salt = salt;
        return this;
    }

    withRoles(roles: string[]): SecureUser {
        this.roles = roles;
        return this;
    }

    withPermissions(permissions: string[]): SecureUser {
        this.permissions = permissions;
        return this;
    }
}