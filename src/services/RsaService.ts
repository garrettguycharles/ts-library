import {generateKeyPair, privateDecrypt, publicEncrypt} from "crypto";
import {promisify} from "util";
import {sleep} from "../utils/functions";

export interface RsaKeyPair {
    public: string;
    private: string;
}

export class RsaService {
    static async generateKeyPair(): Promise<RsaKeyPair> {
        const toReturn = await promisify(generateKeyPair)(
            'rsa', {
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
            }
        );

        return new class implements RsaKeyPair {
            private = toReturn.privateKey;
            public = toReturn.publicKey;
        }
    }

    /**
     * Encrypt a string using a public key.
     *
     * @param payload string to encrypt
     * @param publicKey key to use for encryption
     * @return a JSON string containing an array of chunked encrypted strings
     */
    static async encryptStringWithPublicKey(payload: string, publicKey: string): Promise<string[]> {

        // console.log(payload, publicKey);
        const chunks = RsaService.chunkLongString(payload);

        const toReturn: string[] = [];

        for (const chunk of chunks) {
            const buffer = Buffer.from(chunk);
            const encrypted = publicEncrypt(publicKey, buffer);
            toReturn.push(encrypted.toString("base64"));
            await sleep(0);
        }

        return toReturn;
    }

    /**
     * Decrypt a string which was previously encrypted using encryptStringWithPublicKey
     * @param json JSON string containing array of chunked encrypted strings
     * @param privateKey private key to use for decryption
     * @returns a decrypted string
     */
    static async decryptStringWithPrivateKey(payload: string[], privateKey: string): Promise<string> {
        let toReturn = "";

        for (const chunk of payload) {
            const buffer = Buffer.from(chunk, "base64");
            const decrypted = privateDecrypt({key: privateKey, passphrase: "passphrase"}, buffer);
            toReturn += decrypted.toString("utf8");
            await sleep(0);
        }

        return toReturn;
    }

    private static chunkLongString(s: string): string[] {
        const chunkSize = 128;

        const toReturn: string[] = [];

        for (let i = 0; i < s.length; i += chunkSize) {
            toReturn.push(s.substring(i, i + chunkSize));
        }

        return toReturn;
    }
}