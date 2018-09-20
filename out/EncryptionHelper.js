"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
class EncryptionHelper {
    constructor(salt, iv) {
        this.ivBytes = new Uint8Array(16);
        this.salt = new Uint8Array(16);
        this.salt = new Uint8Array(salt);
        this.ivBytes = new Uint8Array(iv);
    }
    deriveKey(locationInfo) {
        let numbefOfIterations = 1000000;
        let saltBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(this.salt);
        let locationInfoBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(locationInfo);
        return window.crypto.subtle.importKey("raw", locationInfoBytes, { name: "PBKDF2", hash: "SHA-1", length: 256 }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: "PBKDF2", salt: saltBytes, iterations: numbefOfIterations, hash: "SHA-1" }, baseKey, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]);
        });
    }
    encrypt(location, message) {
        var context = this;
        this.deriveKey(location).then(function (aesKey) {
            let plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(message);
            window.crypto.subtle.encrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
                let ciphertextBytes = new Uint8Array(cipherTextBuffer);
                let base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                let ciphertextField = document.getElementById("ciphertextArea");
                ciphertextField.value = base64Ciphertext;
            });
        });
    }
    decrypt(cipherText, locationInputMaterial) {
        var context = this;
        this.deriveKey(locationInputMaterial).then(function (aesKey) {
            let ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(cipherText);
            window.crypto.subtle.decrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, ciphertextBytes).then(function (plainTextBuffer) {
                let plainTextBytes = new Uint8Array(plainTextBuffer);
                let plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
                console.log("sonuccc:" + plaintextString);
            });
        });
    }
}
exports.EncryptionHelper = EncryptionHelper;
