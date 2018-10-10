/**
* @param locationInfo refers to location related elements. Consists of latitude, longitude and tolerance distance, respectively.
* @param message refers to plain text that will be encrypted
* @returns a promise that includes encrypted text, tolerance distance, key hash, salt and iv
*/
export declare function encrypt(locationInfo: [number, number, number], message: string): PromiseLike<Promise<[string, string, Uint8Array, Uint8Array, number]>>;
/**
* @param locationInfo: refers to location related data.Consists of latitude, longitude and tolerance Distance, respectively.
* @param decryptionElements: refers to decryption Elements. Consists of salt, iv , ciphertext and original key hash, respectively.
* @returns a promise with plain text and calculated keyhash
*/
export declare function decrypt(locationInfo: [number, number, number], decryptionElements: [Uint8Array, Uint8Array, string, string]): Promise<any>;
