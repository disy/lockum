export declare class EncryptionHelper {
    ivBytes: Uint8Array;
    salt: Uint8Array;
    constructor(salt: Uint8Array, iv: Uint8Array);
    deriveKey(locationInfo: string): PromiseLike<CryptoKey>;
    encrypt(location: string, message: String): Promise<[string, string]>;
    calculateKeyHash(locationInfo: string): PromiseLike<string>;
    decrypt(possibleLocation: string, cipherText: String, originalKeyHash: string): PromiseLike<string>;
}
