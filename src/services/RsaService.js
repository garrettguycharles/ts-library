"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsaService = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const functions_1 = require("../utils/functions");
class RsaService {
    static async generateKeyPair() {
        const toReturn = await (0, util_1.promisify)(crypto_1.generateKeyPair)('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'passphrase'
            }
        });
        return new class {
            private = toReturn.privateKey;
            public = toReturn.publicKey;
        };
    }
    static async encryptStringWithPublicKey(payload, publicKey) {
        const chunks = RsaService.chunkLongString(payload);
        const toReturn = [];
        for (const chunk of chunks) {
            const buffer = Buffer.from(chunk);
            const encrypted = (0, crypto_1.publicEncrypt)(publicKey, buffer);
            toReturn.push(encrypted.toString("base64"));
            await (0, functions_1.sleep)(0);
        }
        return toReturn;
    }
    static async decryptStringWithPrivateKey(payload, privateKey) {
        let toReturn = "";
        for (const chunk of payload) {
            const buffer = Buffer.from(chunk, "base64");
            const decrypted = (0, crypto_1.privateDecrypt)({ key: privateKey, passphrase: "passphrase" }, buffer);
            toReturn += decrypted.toString("utf8");
            await (0, functions_1.sleep)(0);
        }
        return toReturn;
    }
    static chunkLongString(s) {
        const chunkSize = 128;
        const toReturn = [];
        for (let i = 0; i < s.length; i += chunkSize) {
            toReturn.push(s.substring(i, i + chunkSize));
        }
        return toReturn;
    }
}
exports.RsaService = RsaService;
//# sourceMappingURL=RsaService.js.map