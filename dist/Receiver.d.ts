export declare class Receiver {
    constructor();
    decryptMessage(latitude: [string, number], longitude: [string, number], ciphertext: string, saltBytes: Uint8Array, ivBytes: Uint8Array, toleranceDistance: number, originalHash: string): Promise<any>;
}
