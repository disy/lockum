"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
const text_encoding_1 = require("text-encoding");
class EncryptionHelper {
    constructor(salt, iv) {
        this.ivBytes = new Uint8Array(16);
        this.salt = new Uint8Array(16);
        this.salt = new Uint8Array(salt);
        this.ivBytes = new Uint8Array(iv);
    }
    deriveKey(locationInfo) {
        let numberOfIterations = 1000000;
        let saltBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(this.salt);
        let locationInfoBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(locationInfo);
        return window.crypto.subtle.importKey("raw", locationInfoBytes, { name: "PBKDF2", hash: "SHA-1", length: 256 }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: "PBKDF2", salt: saltBytes, iterations: numberOfIterations, hash: "SHA-1" }, baseKey, { name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]);
        });
    }
    encrypt(location, message) {
        var context = this;
        //get the key and encrypt the message
        this.deriveKey(location).then(function (aesKey) {
            let plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(message);
            window.crypto.subtle.encrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
                let ciphertextBytes = new Uint8Array(cipherTextBuffer);
                let base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                let ciphertextField = document.getElementById("messageToDecrypt");
                ciphertextField.value = base64Ciphertext;
            });
        });
        //calculate the key hash and store it
        this.deriveKey(location).then(function (aesKey) {
            let keyString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(aesKey);
            let buffer = new text_encoding_1.TextEncoder("utf-8").encode(keyString);
            crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
                let keyHash = DataConvertionCalculations_1.DataConvertionCalculations.convertToHex(hash);
                console.log("key hash by the sender is:" + keyHash);
            });
        });
    }
    decrypt(locationInputMaterial, cipherText) {
        var context = this;
        this.deriveKey(locationInputMaterial).then(function (aesKey) {
            let a = window.crypto.subtle.exportKey("raw", aesKey).then(function (keyValue) {
                let keyBytes = new Uint8Array(keyValue);
                let base64Key = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(keyBytes);
                console.log("gorek2:" + base64Key);
            });
        });
        //calculate the key hash and store it
        this.deriveKey(locationInputMaterial).then(function (aesKey) {
            let a = window.crypto.subtle.exportKey("raw", aesKey).then(function (keyValue) {
                let keyBytes = new Uint8Array(keyValue);
                let base64Key = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(keyBytes);
                console.log("key is:" + base64Key);
                window.crypto.subtle.digest("SHA-256", keyBytes).then(function (hash) {
                    let hashBytes = new Uint8Array(hash);
                    let base64KeyHash = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(hashBytes);
                    console.log("key hash on the receiver side is:" + base64KeyHash);
                });
            });
        });
        this.deriveKey(locationInputMaterial).then(function (aesKey) {
            let ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(cipherText);
            window.crypto.subtle.decrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, ciphertextBytes).then(function (plainTextBuffer) {
                let plainTextBytes = new Uint8Array(plainTextBuffer);
                let plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
                let plainTextField = document.getElementById("cipherTextArea");
                plainTextField.value = plaintextString;
            });
        });
    }
}
exports.EncryptionHelper = EncryptionHelper;
