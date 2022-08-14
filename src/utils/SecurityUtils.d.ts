export declare class SecurityUtils {
    static generateSalt(): string;
    static generateHash(pwd: string, salt: string): Promise<string>;
    static verifyHash(pwd: string, salt: string, hash: string): Promise<boolean>;
    static generateUUID(): string;
    static encodeString64(s: string): string;
    static decodeString64(b64: string): string;
    static makeSessionId(user_id: string, authtoken: string): string;
    static readSessionId(sid: string): {
        user_id: string;
        authtoken: string;
    };
}
//# sourceMappingURL=SecurityUtils.d.ts.map