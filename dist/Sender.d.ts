export declare class Sender {
    constructor();
    /**
     * @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
     * @param message refers to plain text that will be encrypted
     * @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
     */
    encryptMessage(locationInfo: [number, number, number], message: string): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array, number]>>;
}
