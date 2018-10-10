export declare class Sender {
    constructor();
    encryptMessage(latitude: number, longitude: number, message: string, toleranceDistance: number): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array, number]>>;
}
