export declare class Sender {
    constructor();
    encryptMessage(latitude: [string, number], longitude: [string, number], message: string, toleranceDistance: number): Promise<[string, string]>;
}
