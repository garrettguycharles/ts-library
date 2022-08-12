export interface RsaKeyPair {
    public: string;
    private: string;
}
export declare class RsaService {
    static generateKeyPair(): Promise<RsaKeyPair>;
    static encryptStringWithPublicKey(payload: string, publicKey: string): Promise<string[]>;
    static decryptStringWithPrivateKey(payload: string[], privateKey: string): Promise<string>;
    private static chunkLongString;
}
//# sourceMappingURL=RsaService.d.ts.map