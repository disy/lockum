import { DataConvertionCalculations } from "../src/DataConvertionCalculations";

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
            { name: "PBKDF2", hash: "SHA-1", length: 256 },
            false,
            ["deriveKey"]
        ).then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
                { name: "PBKDF2", salt: saltBytes, iterations: numberOfIterations, hash: "SHA-1" },
                baseKey,
                { name: "AES-CBC", length: 256 },
                false,
                ["encrypt", "decrypt"]
            )
        })
    }

    public encrypt(location: string, message: String) {
        var context = this
            
        this.deriveKey(location
        ).then(function (aesKey) {
            let plainTextBytes = DataConvertionCalculations.stringToByteArray(message)

            window.crypto.subtle.encrypt(
                { name: "AES-CBC", iv: context.ivBytes },
                aesKey,
                plainTextBytes,
            ).then(function (cipherTextBuffer) {
                let ciphertextBytes = new Uint8Array(cipherTextBuffer)
                let base64Ciphertext = DataConvertionCalculations.byteArrayToBase64(ciphertextBytes)
                let ciphertextField = <HTMLTextAreaElement>document.getElementById("messageToDecrypt")
                ciphertextField.value = base64Ciphertext
            })
        })
    }

    public decrypt( locationInputMaterial: string, cipherText: String) {
        var context = this
       
        this.deriveKey(locationInputMaterial
        ).then(function (aesKey) {
            let ciphertextBytes = DataConvertionCalculations.base64ToByteArray(cipherText)
            window.crypto.subtle.decrypt(
                { name: "AES-CBC", iv: context.ivBytes },
                aesKey,
                ciphertextBytes
            ).then(function (plainTextBuffer) {
                let plainTextBytes = new Uint8Array(plainTextBuffer)
                let plaintextString = DataConvertionCalculations.byteArrayToString(plainTextBytes)
                let plainTextField = <HTMLTextAreaElement>document.getElementById("cipherTextArea")
                plainTextField.value = plaintextString
            })
        })
    }
}
