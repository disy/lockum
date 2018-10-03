export declare class Receiver {
    constructor();
    decryptMessage(latitude: number, longitude: number, ciphertext: string): PromiseLike<string>;
}
