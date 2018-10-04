export declare function encrypt(latitude: [string, number], longitude: [string, number], message: any, toleranceDistance: number): Promise<[string, string]>;
export declare function decrypt(latitude: [string, number], longitude: [string, number], ciphertext: any): Promise<any>;
