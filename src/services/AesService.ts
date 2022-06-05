import {
    generateKeyPair,
    publicEncrypt,
    privateDecrypt,
    randomBytes,
    Cipher,
    createCipheriv, createDecipheriv
} from "crypto";
import {promisify} from "util";

export interface AesEncryptedPackage {
    initializationVector: string;
    encrypted: string[];
}

export class AesService {

    static async generateSecretKey(): Promise<string> {
        return Promise.resolve(randomBytes(32).toString("base64"));
    }

    /**
     * Encrypt a string using a public key.
     *
     * @param payload string to encrypt
     * @param passkey key to use for encryption
     * @return a JSON string containing an array of chunked encrypted strings
     */
    static async encryptStringWithPasskey(
        payload: string, secret: string
    ): Promise<AesEncryptedPackage> {

        const algorithm = "aes-256-cbc";

        // generate 16 bytes of random data
        const initVector = randomBytes(16);

        // // secret key generate 32 bytes of random data
        // const Securitykey = randomBytes(32);
        const Securitykey = Buffer.from(secret, "base64");

        // the cipher function
        const cipher = createCipheriv(algorithm, Securitykey, initVector);

        const chunks = AesService.chunkLongString(payload);

        const encryptedChunks: string[] = []

        // encrypt the message
        // input encoding
        // output encoding
        for (const chunk of chunks) {
            encryptedChunks.push(cipher.update(chunk, "utf-8", "hex"));
        }

        encryptedChunks.push(cipher.final("hex"));

        return Promise.resolve(new class implements AesEncryptedPackage {
            encrypted = encryptedChunks;
            initializationVector = initVector.toString("base64");
        });
    }

    static async decryptStringWithSecretAndInitVector(
        encrypted: string[], passkey: string, initializationVector: string
    ): Promise<string> {
        const algorithm = "aes-256-cbc";

        const decipher = createDecipheriv(
            algorithm,
            Buffer.from(passkey, "base64"),
            Buffer.from(initializationVector,"base64")
        );

        const encryptedChunks: string[] = encrypted;

        let decryptedData = "";

        for (const chunk of encryptedChunks) {
            decryptedData += decipher.update(chunk, "hex", "utf-8");
        }
        decryptedData += decipher.final("utf-8");

        return Promise.resolve(decryptedData);
    }

    private static chunkLongString(s: string): string[] {
        const chunkSize = 4096;

        const toReturn: string[] = [];

        for (let i = 0; i < s.length; i += chunkSize) {
            toReturn.push(s.substring(i, i + chunkSize));
        }

        return toReturn;
    }
}