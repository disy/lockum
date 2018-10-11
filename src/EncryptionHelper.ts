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

        return window.crypto.subtle.importKey(
            KEYFORMAT,
            transformedLocation,
            { name: KEYDERIVATIONALGORITHM, hash: HASHTYPE, length: HASHLENGTH },
            false,
            ["deriveKey"]
        ).then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
                { name: KEYDERIVATIONALGORITHM, salt: context.salt, iterations: NUMBEROFITERATIONS, hash: HASHTYPE },
                baseKey,
                { name: ENCRYPTIONALGORITHM, length: KEYLENGTH },
                true,
                ["encrypt", "decrypt"]
            )
        })
    }

    public encrypt(transformedLocation: Int32Array, message: String,toleranceDistance: number) {
        let context = this

        return this.deriveKey(transformedLocation
        ).then(function (aesKey) {
            let keyhash = context.calculateKeyHash(aesKey)
            let plainTextBytes = DataConvertionCalculations.stringToByteArray(message)
            let encryptedMessage = context.encryptMessage(aesKey,plainTextBytes)    
            
            return Promise.all([encryptedMessage,keyhash,toleranceDistance,context.salt,context.ivBytes])
        })
    }

    private encryptMessage(aesKey: CryptoKey, plainTextBytes: Uint8Array) {
        let context = this

        return window.crypto.subtle.encrypt(
            { name: ENCRYPTIONALGORITHM, iv: context.ivBytes },
            aesKey,
            plainTextBytes,
        ).then(function (cipherTextBuffer) {
            let ciphertextBytes = new Uint8Array(cipherTextBuffer)
            let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes)
            
            return base64Ciphertext
        })
    }

    private calculateKeyHash(aesKey: CryptoKey) {
        return crypto.subtle.exportKey(KEYFORMAT, aesKey).then(function (result) {
            return crypto.subtle.digest(HASHTYPE, result).then(function (hash) {
                let keyHash = DataConvertionCalculations.convertToHex(hash)
                return keyHash
            })
        })
    }

    public decrypt(transformedLocation: Int32Array, cipherText: String, originalKeyHash: string) {
        let context = this
        return this.deriveKey(transformedLocation).then(function (key) {
            let plainText = context.calculateKeyHash(key)
            return plainText.then(function(keyhash){
                if (keyhash == originalKeyHash) {
                    let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(cipherText)
                    return context.decryptMessage(key,ciphertextBytes).then(function(resultingPlaintText){
                        return [resultingPlaintText,keyhash]
                    })
                }
            })
        })
    }

    private decryptMessage(aesKey: CryptoKey, plainTextBytes: Uint8Array) {
        let context = this
        return window.crypto.subtle.decrypt(
            { name: ENCRYPTIONALGORITHM, iv: context.ivBytes },
            aesKey,
            plainTextBytes,
        ).then(function (cipherTextBuffer) {
            let ciphertextBytes = new Uint8Array(cipherTextBuffer)
            let cipherTextString = DataConvertionCalculations.byteArrayToString(ciphertextBytes)
            return cipherTextString
        })
    }
}
