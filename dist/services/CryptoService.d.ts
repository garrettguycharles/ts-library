export interface CryptoChallenge {
    challenge_id: string;
    encrypted_challenge: string[];
    encrypted_secret: string[];
    iv: string;
}
export interface CryptoChallengeSolution {
    challenge_id: string;
    solution: string;
}
export declare class CryptoService {
    static generateChallenge(publicKey: string): Promise<CryptoChallenge>;
    static deleteChallenge(id: string): Promise<void>;
    static solveChallenge(challenge: CryptoChallenge, privateKey: string): Promise<CryptoChallengeSolution>;
    static verifyChallengeSolution(solution: CryptoChallengeSolution): Promise<boolean>;
}
//# sourceMappingURL=CryptoService.d.ts.map