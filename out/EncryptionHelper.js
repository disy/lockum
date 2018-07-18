"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper() {
    }
    EncryptionHelper.prototype.EncryptionHelper = function () {
    };
    EncryptionHelper.deriveKey = function () {
        window.crypto.subtle.generateKey({ name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]).then(function (key) {
            return window.crypto.subtle.exportKey("raw", key);
        }).then(function (buf) {
            var byteArray = new Uint8Array(buf);
            var keyField = document.getElementById("keyinputarea");
            keyField.value = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToHexString(byteArray);
        });
    };
    EncryptionHelper.encrypt = function () {
        var keyField = document.getElementById("keyinputarea");
        var hexString = keyField.value;
        console.log("valuemiz: " + hexString);
        var keyBytes = DataConvertionCalculations_1.DataConvertionCalculations.hexStringToByteArray(hexString);
        var plainTextField = document.getElementById("messageToEncrypt");
        var plainText = plainTextField.value;
        var plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(plainText);
        window.crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", hash: "SHA-1", length: 256 }, true, ["encrypt"]).then(function (key) {
            var iv = window.crypto.getRandomValues(new Uint8Array(16));
            var ivField = document.getElementById("iterationField");
            var ivHexString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToHexString(iv);
            ivField.value = ivHexString;
            //we use cryptokey to encrypt the plaintext
            return window.crypto.subtle.encrypt({ name: "AES-CBC", iv: iv }, key, plainTextBytes);
        }).then(function (ciphertextBuf) {
            var ciphertextBytes = new Uint8Array(ciphertextBuf);
            var base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
            var ciphertextField = document.getElementById("ciphertextArea");
            ciphertextField.value = base64Ciphertext;
        });
    };
    EncryptionHelper.decrypt = function () {
        //we start by getting the key,ıv and cipher text into byte arrays
        var keyField = document.getElementById("keyinputarea");
        var keyHexString = keyField.value;
        var keyBytes = DataConvertionCalculations_1.DataConvertionCalculations.hexStringToByteArray(keyHexString);
        var ivField = document.getElementById("iterationField");
        var ivHexString = ivField.value;
        var ivBytes = DataConvertionCalculations_1.DataConvertionCalculations.hexStringToByteArray(ivHexString);
        var ciphertextField = document.getElementById("ciphertextArea");
        var ciphertextBase64String = ciphertextField.value;
        var ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(ciphertextBase64String);
        // Make a CryptoKey from the Key string
        window.crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", hash: "SHA-1", length: 256 }, false, ["decrypt"]).then(function (key) {
            // Use the CryptoKey and IV to decrypt the plaintext
            return window.crypto.subtle.decrypt({ name: "AES-CBC", iv: ivBytes }, key, ciphertextBytes);
        }).then(function (plaintextBuf) {
            var plainTextBytes = new Uint8Array(plaintextBuf);
            var plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
            var keyField = document.getElementById("keyinputarea");
            keyField.value = plaintextString;
        });
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
