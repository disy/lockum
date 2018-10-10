export declare function encrypt(latitude: number, longitude: number, message: string, toleranceDistance: number): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array, number]>>;
export declare function decrypt(latitude: number, longitude: number, ciphertext: string, saltBytes: Uint8Array, ivBytes: Uint8Array, toleranceDistance: number, originalHash: string): Promise<any>;
