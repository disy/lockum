import { DataConvertionCalculations } from "../src/DataConvertionCalculations";

const numberOfIterations = 1000000
const hashType = "SHA-256"
const hashLength = 256
const keyderivationAlgorithm = "PBKDF2"
const encryptionAlgorithm = "AES-GCM"
const keyLength = 256
const keyFormat = "raw"

export class EncryptionHelper {
    ivBytes: Uint8Array = new Uint8Array(16)
    salt: Uint8Array = new Uint8Array(16)

    constructor(salt: Uint8Array, iv: Uint8Array) {
        this.salt = new Uint8Array(salt)
        this.ivBytes = new Uint8Array(iv)
    }

    public deriveKey(locationInfo: Int32Array) {
        let saltBytes = DataConvertionCalculations.stringToByteArray(this.salt)

        return window.crypto.subtle.importKey(
            keyFormat,
            locationInfo,
            { name: keyderivationAlgorithm, hash: hashType, length: hashLength },
            false,
            ["deriveKey"]
        ).then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
                { name: keyderivationAlgorithm, salt: saltBytes, iterations: numberOfIterations, hash: hashType },
                baseKey,
                { name: encryptionAlgorithm, length: keyLength },
                true,
                ["encrypt", "decrypt"]
            )
        })
    }

    public encrypt(location: Int32Array, message: String) {
        let context = this
        let keyHash = this.calculateKeyHash(location)

        let encryptedMEssage = this.deriveKey(location
        ).then(function (aesKey) {
            let plainTextBytes = DataConvertionCalculations.stringToByteArray(message)

            return window.crypto.subtle.encrypt(
                { name: encryptionAlgorithm, iv: context.ivBytes },
                aesKey,
                plainTextBytes,
            ).then(function (cipherTextBuffer) {
                let ciphertextBytes = new Uint8Array(cipherTextBuffer)
                let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes)
                let ciphertextField = <HTMLTextAreaElement>document.getElementById("messageToDecrypt")
                ciphertextField.value = base64Ciphertext

                return base64Ciphertext
            })
        })

        return Promise.all([keyHash, encryptedMEssage])
    }

    public calculateKeyHash(locationInfo: Int32Array) {
        return this.deriveKey(locationInfo).then(function (aesKey) {
            return crypto.subtle.exportKey(keyFormat, aesKey).then(function (result) {
                return crypto.subtle.digest(hashType, result).then(function (hash) {
                    let keyHash = DataConvertionCalculations.convertToHex(hash)
                    return keyHash
                })
            })
        })
    }

    public decrypt(possibleLocation: Int32Array, cipherText: String, originalKeyHash: string) {
        let context = this

        return this.deriveKey(possibleLocation).then(function (key) {

            return crypto.subtle.exportKey(keyFormat, key).then(function (rawKey) {

                return crypto.subtle.digest(hashType, rawKey).then(function (hash) {
                    let keyHash = DataConvertionCalculations.convertToHex(hash)

                    if (keyHash == originalKeyHash) {
                        let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(cipherText)

                        return crypto.subtle.decrypt(
                            { name: encryptionAlgorithm, iv: context.ivBytes },
                            key,
                            ciphertextBytes
                        ).then(function (plainTextBuffer) {
                            let plainTextBytes = new Uint8Array(plainTextBuffer)
                            let plaintextString = DataConvertionCalculations.byteArrayToString(plainTextBytes)
                            let plainTextField = <HTMLTextAreaElement>document.getElementById("cipherTextArea")
                            plainTextField.value = plaintextString
                            return [plaintextString, keyHash]
                        })
                    }
                })
            })
        })
    }
}
