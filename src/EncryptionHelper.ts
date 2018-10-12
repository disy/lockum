import { DataConvertionCalculations } from "../src/DataConvertionCalculations";

const NUMBEROFITERATIONS = 1000000
const HASHTYPE = "SHA-256"
const HASHLENGTH = 256
const KEYDERIVATIONALGORITHM = "PBKDF2"
const ENCRYPTIONALGORITHM = "AES-GCM"
const KEYLENGTH = 256
const KEYFORMAT = "raw"

export class EncryptionHelper {
    ivBytes: Uint8Array = new Uint8Array(16)
    salt: Uint8Array = new Uint8Array(16)

    constructor(salt: Uint8Array, iv: Uint8Array) {
        this.salt = new Uint8Array(salt)
        this.ivBytes = new Uint8Array(iv)
    }

    private deriveKey(transformedLocation: Int32Array) {
        let context = this

        return crypto.subtle.importKey(
            KEYFORMAT,
            transformedLocation,
            { name: KEYDERIVATIONALGORITHM, hash: HASHTYPE, length: HASHLENGTH },
            false,
            ["deriveKey"]
        ).then(function (baseKey) {
            return crypto.subtle.deriveKey(
                { name: KEYDERIVATIONALGORITHM, salt: context.salt, iterations: NUMBEROFITERATIONS, hash: HASHTYPE },
                baseKey,
                { name: ENCRYPTIONALGORITHM, length: KEYLENGTH },
                true,
                ["encrypt", "decrypt"]
            )
        })
    }

    public async encrypt(transformedLocation: Int32Array, message: String, toleranceDistance: number) {
        let context = this
        try {
            let key = await this.deriveKey(transformedLocation)
            let keyhash = await this.calculateKeyHash(key)
            let plaintTextBytes = DataConvertionCalculations.stringToByteArray(message)
            let encryptedMessage = await this.encryptMessage(key, plaintTextBytes)
            return [encryptedMessage, keyhash, toleranceDistance, context.salt, context.ivBytes]
        } catch (err) {
            console.log("encryption has not been successfull:" + err)
        }
    }

    private async encryptMessage(aesKey: CryptoKey, plainTextBytes: Uint8Array) {
        let context = this
        try {
            let encryptionPromise = await crypto.subtle.encrypt({ name: ENCRYPTIONALGORITHM, iv: context.ivBytes }, aesKey, plainTextBytes)
            let ciphertextBytes = new Uint8Array(encryptionPromise)
            let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes)
            return base64Ciphertext
        } catch (err) {
            console.log("message cannot be encrypted: " + err)
        }
    }

    private async calculateKeyHash(aesKey: CryptoKey) {
        try {
            let exportKeyPromise = await crypto.subtle.exportKey(KEYFORMAT, aesKey)
            let hashPromise = await crypto.subtle.digest(HASHTYPE, exportKeyPromise)
            let keyHash = DataConvertionCalculations.convertToHex(hashPromise)
            return keyHash
        } catch (err) {
            console.log("key couldnt be hashed: " + err)
        }
    }

    public async decrypt(transformedLocation: Int32Array, cipherText: String, originalKeyHash: string) {
        try {
            let key = await this.deriveKey(transformedLocation)
            let keyHash = await this.calculateKeyHash(key)
            let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(cipherText)

            if (keyHash == originalKeyHash) {
                let result = await this.decryptMessage(key, ciphertextBytes)
                return [result, keyHash]
            }
        } catch (err) {
            console.log("decryption was unsuccessfull: " + err)
        }
    }

    private async decryptMessage(aesKey: CryptoKey, plainTextBytes: Uint8Array) {
        let context = this
        try {
            let decryptPromise = await crypto.subtle.decrypt({ name: ENCRYPTIONALGORITHM, iv: context.ivBytes }, aesKey, plainTextBytes)
            let cipherTextBytes = new Uint8Array(decryptPromise)
            let cipherTextString = DataConvertionCalculations.byteArrayToString(cipherTextBytes)
            return cipherTextString
        } catch (error) {
            console.log("message cannot be decrypted: " + error)
        }
    }
}
