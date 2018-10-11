export declare class EncryptionHelper {
    ivBytes: Uint8Array;
    salt: Uint8Array;
    constructor(salt: Uint8Array, iv: Uint8Array);
    deriveKey(locationInfo: Int32Array): PromiseLike<CryptoKey>;
    encrypt(location: Int32Array, message: String, toleranceDistance: number): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array, number]>>;
    private encryptMessage;
    private calculateKeyHash;
    decrypt(possibleLocation: Int32Array, cipherText: String, originalKeyHash: string): PromiseLike<string[]>;
    private decryptMessage;
}
