export declare class Sender {
    constructor();
    encryptMessage(latitude: number, longitude: number, message: string, toleranceDistance: number): Promise<[string, string]>;
}
