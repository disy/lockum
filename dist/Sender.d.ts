export declare class Sender {
    constructor();
    encryptMessage(latitude: [string, number], longitude: [string, number], message: string, toleranceDistance: number): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array]>>;
}
