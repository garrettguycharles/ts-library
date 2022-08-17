/**
 * Model object for users.
 */
import {Entity} from "../entities/Entity";

export class User extends Entity {
    email = "";
    family_name = "";
    given_name = "";
    avatar = "";

    withEmail(email: string): this {
        this.email = email;
        return this;
    }

    withGivenName(name: string): this {
        this.given_name = name;
        return this;
    }

    withFamilyName(name: string): this {
        this.family_name = name;
        return this;
    }

    withAvatar(url: string): this {
        this.avatar = url;
        return this;
    }
}

export class SecureUser extends User {
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