import { DataConvertionCalculations } from "../src/DataConvertionCalculations";
import { TextEncoder, TextDecoder } from "text-encoding";

export class EncryptionHelper {
    ivBytes: Uint8Array = new Uint8Array(16)
    salt: Uint8Array = new Uint8Array(16)

    constructor(salt: Uint8Array, iv: Uint8Array) {
        this.salt = new Uint8Array(salt)
        this.ivBytes = new Uint8Array(iv)
    }

    public deriveKey(locationInfo: string) {
        let numberOfIterations = 1000000
        let saltBytes = DataConvertionCalculations.stringToByteArray(this.salt)
        let locationInfoBytes = DataConvertionCalculations.stringToByteArray(locationInfo)

        return window.crypto.subtle.importKey(
            "raw",
            locationInfoBytes,
            { name: "PBKDF2", hash: "SHA-256", length: 256 },
            false,
            ["deriveKey"]
        ).then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: saltBytes, iterations: numberOfIterations, hash: "SHA-256" },
                baseKey,
                { name: "AES-GCM", length: 256 },
                true,
                ["encrypt", "decrypt"]
            )
        })
    }

    public encrypt(location: string, message: String) {
        var context = this

        //get the key and encrypt the message
        this.deriveKey(location
        ).then(function (aesKey) {
            let plainTextBytes = DataConvertionCalculations.stringToByteArray(message)

            window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv: context.ivBytes },
                aesKey,
                plainTextBytes,
            ).then(function (cipherTextBuffer) {
                let ciphertextBytes = new Uint8Array(cipherTextBuffer)
                let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes)
                let ciphertextField = <HTMLTextAreaElement>document.getElementById("messageToDecrypt")
                ciphertextField.value = base64Ciphertext
            })
        })

        //calculate the key hash and store it
        this.deriveKey(location
        ).then(function (rawKey) {
            let secretKey = rawKey
            return crypto.subtle.exportKey("jwk", secretKey).then(function (result) {
                let exportedKey = result
                let keyValue = btoa(exportedKey.k)
                return keyValue
            }).then(function (keyValue) {
                let buffer = new TextEncoder("utf-8").encode(keyValue)
                crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
                    let keyHash = DataConvertionCalculations.convertToHex(hash)
                    localStorage.setItem("keyhash", keyHash)
                    console.log("key hash by the sender is:" + keyHash)
                })

            })
        })
    }

    public decrypt(locationInputMaterial: string, cipherText: String) {
        let context = this

        //calculate the key hash and store it
        this.deriveKey(locationInputMaterial
        ).then(function (rawKey) {
            let secretKey = rawKey
            return crypto.subtle.exportKey("jwk", secretKey).then(function (result) {
                let exportedKey = result
                let keyValue = btoa(exportedKey.k)
                return keyValue
            }).then(function (keyValue) {
                let buffer = new TextEncoder("utf-8").encode(keyValue)
                return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
                    let keyHash = DataConvertionCalculations.convertToHex(hash)
                    let originalHash = localStorage.getItem("keyhash")

                    if (keyHash == originalHash) {
                        let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(cipherText)
                        window.crypto.subtle.decrypt(
                            { name: "AES-GCM", iv: context.ivBytes },
                            rawKey,
                            ciphertextBytes
                        ).then(function (plainTextBuffer) {
                            let plainTextBytes = new Uint8Array(plainTextBuffer)
                            let plaintextString = DataConvertionCalculations.byteArrayToString(plainTextBytes)
                            let plainTextField = <HTMLTextAreaElement>document.getElementById("cipherTextArea")
                            plainTextField.value = plaintextString
                        })
                    } else {
                        throw ("keys are not matched! relocate the find the correct area!")
                    }
                })
            })
        })



    }
}
