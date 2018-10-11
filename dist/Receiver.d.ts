export declare class Receiver {
    constructor();
    /**
     * @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
     * @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
     * @returns a promise that returns plain text and calculated keyhash
     */
    decryptMessage(locationInfo: [number, number, number], decryptionElements: [Uint8Array, Uint8Array, string, string]): Promise<any>;
}
