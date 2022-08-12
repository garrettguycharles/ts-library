export interface AesEncryptedPackage {
    initializationVector: string;
    encrypted: string[];
}
export declare class AesService {
    static generateSecretKey(): Promise<string>;
    /**
     * Encrypt a string using a public key.
     *
     * @param payload string to encrypt
     * @param passkey key to use for encryption
     * @return a JSON string containing an array of chunked encrypted strings
     */
    static encryptStringWithPasskey(payload: string, secret: string): Promise<AesEncryptedPackage>;
    static decryptStringWithSecretAndInitVector(encrypted: string[], passkey: string, initializationVector: string): Promise<string>;
    private static chunkLongString;
}
//# sourceMappingURL=AesService.d.ts.map