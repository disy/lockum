export declare class Receiver {
    constructor();
    decryptMessage(latitude: [string, number], longitude: [string, number], ciphertext: string): Promise<[string, string, string, string, string, string, string, string, string]>;
}
