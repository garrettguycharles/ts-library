/**
 * Model object for users.
 */
import {Entity, IEntity} from "../entities/Entity";

export interface IUser extends IEntity {
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

    /**
     * Tags for miscellaneous use. This is a place to
     * tie a user to other data. For example: when a user
     * is added to an IVendor, put a tag in this user
     * so that you can look up the user's vendor by the tag
     * instead of doing an O(n^2) lookup through all of the
     * vendors' admins and team members.
     */
    tags: string[];
}

export class User extends Entity<IUser> implements IUser {
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
    roles: string[] = [];
    tags: string[] = [];

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
}

export const TAGS = {
    VENDOR: "VENDOR"
}