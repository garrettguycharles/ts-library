export interface RsaKeyPair {
    public: string;
    private: string;
}
export declare class RsaService {
    static generateKeyPair(): Promise<RsaKeyPair>;
    /**
     * Encrypt a string using a public key.
     *
     * @param payload string to encrypt
     * @param publicKey key to use for encryption
     * @return a JSON string containing an array of chunked encrypted strings
     */
    static encryptStringWithPublicKey(payload: string, publicKey: string): Promise<string[]>;
    /**
     * Decrypt a string which was previously encrypted using encryptStringWithPublicKey
     * @param json JSON string containing array of chunked encrypted strings
     * @param privateKey private key to use for decryption
     * @returns a decrypted string
     */
    static decryptStringWithPrivateKey(payload: string[], privateKey: string): Promise<string>;
    private static chunkLongString;
}
//# sourceMappingURL=RsaService.d.ts.map