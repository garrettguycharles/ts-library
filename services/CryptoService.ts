import {RsaService} from "./RsaService";
import {randomBytes, randomUUID} from "crypto";
import {hash, verify} from "argon2";
import {AesService} from "./AesService";
import {Logger} from "../logging/Logger";

const log = new Logger();

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

const challenges: {[key: string]: CryptoChallengeSolution} = {};

export class CryptoService {
    static async generateChallenge(publicKey: string): Promise<CryptoChallenge> {
        // console.log(`Challenges size: ${Object.keys(challenges).length}`);
        const newId = randomUUID();
        const challengeBody = randomBytes(2048).toString("base64");
        const plainSecret = await AesService.generateSecretKey();
        const encryptedPackage = await AesService
            .encryptStringWithPasskey(challengeBody, plainSecret);

        const encryptedSecret = await RsaService.encryptStringWithPublicKey(plainSecret, publicKey);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const hashedChallenge = await hash(challengeBody);

        const solution = new class implements CryptoChallengeSolution {
            challenge_id = newId;
            solution = hashedChallenge;
        }

        challenges[newId] = solution;

        return new class implements CryptoChallenge {
            challenge_id = newId;
            encrypted_challenge = encryptedPackage.encrypted;
            encrypted_secret = encryptedSecret;
            iv = encryptedPackage.initializationVector;
        }
    }

    static async deleteChallenge(id: string): Promise<void> {
        delete challenges[id];
        return Promise.resolve();
    }

    static async solveChallenge(
        challenge: CryptoChallenge, privateKey: string
    ): Promise<CryptoChallengeSolution> {

        const secret = await RsaService.decryptStringWithPrivateKey(
            challenge.encrypted_secret, privateKey
        );

        const solvedChallenge = await AesService.decryptStringWithSecretAndInitVector(
            challenge.encrypted_challenge,
            secret, challenge.iv
        );

        return new class implements CryptoChallengeSolution {
            challenge_id = challenge.challenge_id;
            solution = solvedChallenge;
        }
    }

    static async verifyChallengeSolution(solution: CryptoChallengeSolution): Promise<boolean> {
        const stored_solution = challenges[solution.challenge_id];

        if (!stored_solution) {
            return false;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const outcome: boolean = await verify(stored_solution.solution, solution.solution);

            if (outcome) {
                delete challenges[solution.challenge_id];
            }

            return outcome;
        } catch (e) {
            log.error(e as Error);
            return false;
        }
    }
}