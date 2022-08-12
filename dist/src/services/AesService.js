"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesService = void 0;
const crypto_1 = require("crypto");
class AesService {
    static async generateSecretKey() {
        return Promise.resolve((0, crypto_1.randomBytes)(32).toString("base64"));
    }
    /**
     * Encrypt a string using a public key.
     *
     * @param payload string to encrypt
     * @param passkey key to use for encryption
     * @return a JSON string containing an array of chunked encrypted strings
     */
    static async encryptStringWithPasskey(payload, secret) {
        const algorithm = "aes-256-cbc";
        // generate 16 bytes of random data
        const initVector = (0, crypto_1.randomBytes)(16);
        // // secret key generate 32 bytes of random data
        // const Securitykey = randomBytes(32);
        const Securitykey = Buffer.from(secret, "base64");
        // the cipher function
        const cipher = (0, crypto_1.createCipheriv)(algorithm, Securitykey, initVector);
        const chunks = AesService.chunkLongString(payload);
        const encryptedChunks = [];
        // encrypt the message
        // input encoding
        // output encoding
        for (const chunk of chunks) {
            encryptedChunks.push(cipher.update(chunk, "utf-8", "hex"));
        }
        encryptedChunks.push(cipher.final("hex"));
        return Promise.resolve(new class {
            encrypted = encryptedChunks;
            initializationVector = initVector.toString("base64");
        });
    }
    static async decryptStringWithSecretAndInitVector(encrypted, passkey, initializationVector) {
        const algorithm = "aes-256-cbc";
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, Buffer.from(passkey, "base64"), Buffer.from(initializationVector, "base64"));
        const encryptedChunks = encrypted;
        let decryptedData = "";
        for (const chunk of encryptedChunks) {
            decryptedData += decipher.update(chunk, "hex", "utf-8");
        }
        decryptedData += decipher.final("utf-8");
        return Promise.resolve(decryptedData);
    }
    static chunkLongString(s) {
        const chunkSize = 4096;
        const toReturn = [];
        for (let i = 0; i < s.length; i += chunkSize) {
            toReturn.push(s.substring(i, i + chunkSize));
        }
        return toReturn;
    }
}
exports.AesService = AesService;
