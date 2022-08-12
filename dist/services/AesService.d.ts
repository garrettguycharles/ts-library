export interface AesEncryptedPackage {
    initializationVector: string;
    encrypted: string[];
}
export declare class AesService {
    static generateSecretKey(): Promise<string>;
    static encryptStringWithPasskey(payload: string, secret: string): Promise<AesEncryptedPackage>;
    static decryptStringWithSecretAndInitVector(encrypted: string[], passkey: string, initializationVector: string): Promise<string>;
    private static chunkLongString;
}
//# sourceMappingURL=AesService.d.ts.map