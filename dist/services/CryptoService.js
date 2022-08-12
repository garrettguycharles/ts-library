"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const RsaService_1 = require("./RsaService");
const crypto_1 = require("crypto");
const argon2_1 = require("argon2");
const AesService_1 = require("./AesService");
const Logger_1 = require("../logger/Logger");
const challenges = {};
class CryptoService {
    static async generateChallenge(publicKey) {
        const newId = (0, crypto_1.randomUUID)();
        const challengeBody = (0, crypto_1.randomBytes)(2048).toString("base64");
        const plainSecret = await AesService_1.AesService.generateSecretKey();
        const encryptedPackage = await AesService_1.AesService
            .encryptStringWithPasskey(challengeBody, plainSecret);
        const encryptedSecret = await RsaService_1.RsaService.encryptStringWithPublicKey(plainSecret, publicKey);
        const hashedChallenge = await (0, argon2_1.hash)(challengeBody);
        const solution = new class {
            challenge_id = newId;
            solution = hashedChallenge;
        };
        challenges[newId] = solution;
        return new class {
            challenge_id = newId;
            encrypted_challenge = encryptedPackage.encrypted;
            encrypted_secret = encryptedSecret;
            iv = encryptedPackage.initializationVector;
        };
    }
    static async deleteChallenge(id) {
        delete challenges[id];
        return Promise.resolve();
    }
    static async solveChallenge(challenge, privateKey) {
        const secret = await RsaService_1.RsaService.decryptStringWithPrivateKey(challenge.encrypted_secret, privateKey);
        const solvedChallenge = await AesService_1.AesService.decryptStringWithSecretAndInitVector(challenge.encrypted_challenge, secret, challenge.iv);
        return new class {
            challenge_id = challenge.challenge_id;
            solution = solvedChallenge;
        };
    }
    static async verifyChallengeSolution(solution) {
        const stored_solution = challenges[solution.challenge_id];
        if (!stored_solution) {
            return false;
        }
        try {
            const outcome = await (0, argon2_1.verify)(stored_solution.solution, solution.solution);
            if (outcome) {
                delete challenges[solution.challenge_id];
            }
            return outcome;
        }
        catch (e) {
            Logger_1.log.error(e);
            return false;
        }
    }
}
exports.CryptoService = CryptoService;
//# sourceMappingURL=CryptoService.js.map