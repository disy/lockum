export declare function encrypt(latitude: any, longitude: any, message: any, toleranceDistance: any): Promise<[string, string]>;
export declare function decrypt(latitude: any, longitude: any, ciphertext: any): PromiseLike<string>;
