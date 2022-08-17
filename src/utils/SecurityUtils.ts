import {random_range} from "./functions";
import {v4} from "uuid";
import argon2 from 'argon2';

export class SecurityUtils {
    public static generateSalt(): string {
        let toReturn = this.generateUUID();
        toReturn += this.generateUUID();

        while (toReturn.length > 32) {
            const i = random_range(1, toReturn.length - 2);
            toReturn = toReturn.substring(0, i) + toReturn.substring(i + 1);
        }

        return toReturn;
    }

    public static async generateHash(pwd: string, salt: string): Promise<string> {
        const hash = await argon2.hash(pwd + salt);
        return hash;
    }

    public static async verifyHash(pwd: string, salt: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, pwd + salt);
    }

    public static generateUUID() {
        return v4();
    }

    public static encodeString64(s: string): string {
        return Buffer.from(s, "utf8").toString("base64");
    }

    public static decodeString64(b64: string): string {
        return Buffer.from(b64, "base64").toString("utf8");
    }

    static makeSessionId(user_id: string, authtoken: string) {
        return this.encodeString64(JSON.stringify({
            user_id: user_id,
            authtoken: authtoken
        }));
    }

    static readSessionId(sid: string): {user_id: string, authtoken: string} {
        try {
            return JSON.parse(
                this.decodeString64(sid)
            ) as {user_id: string, authtoken: string};
        } catch (e) {
            return {user_id: "", authtoken: ""};
        }
    }
}