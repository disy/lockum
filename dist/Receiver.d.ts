export declare class Receiver {
    constructor();
    decryptMessage(latitude: number, longitude: number, ciphertext: string, saltBytes: Uint8Array, ivBytes: Uint8Array, toleranceDistance: number, originalHash: string): Promise<any>;
}
