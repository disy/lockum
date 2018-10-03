"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
var numberOfIterations = 1000000;
var hashType = "SHA-256";
var hashLength = 256;
var keyderivationAlgorithm = "PBKDF2";
var encryptionAlgorithm = "AES-GCM";
var keyLength = 256;
var keyFormat = "raw";
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper(salt, iv) {
        this.ivBytes = new Uint8Array(16);
        this.salt = new Uint8Array(16);
        this.salt = new Uint8Array(salt);
        this.ivBytes = new Uint8Array(iv);
    }
    EncryptionHelper.prototype.deriveKey = function (locationInfo) {
        var saltBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(this.salt);
        var locationInfoBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(locationInfo);
        return window.crypto.subtle.importKey(keyFormat, locationInfoBytes, { name: keyderivationAlgorithm, hash: hashType, length: hashLength }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: keyderivationAlgorithm, salt: saltBytes, iterations: numberOfIterations, hash: hashType }, baseKey, { name: encryptionAlgorithm, length: keyLength }, true, ["encrypt", "decrypt"]);
        });
    };
    EncryptionHelper.prototype.encrypt = function (location, message) {
        var context = this;
        //get the key and encrypt the message
        var keyHash = this.calculateKeyHash(location);
        var encryptedMEssage = this.deriveKey(location).then(function (aesKey) {
            var plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(message);
            return window.crypto.subtle.encrypt({ name: encryptionAlgorithm, iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
                var ciphertextBytes = new Uint8Array(cipherTextBuffer);
                var base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                var ciphertextField = document.getElementById("messageToDecrypt");
                ciphertextField.value = base64Ciphertext;
                return base64Ciphertext;
            });
        });
        return Promise.all([keyHash, encryptedMEssage]);
    };
    EncryptionHelper.prototype.calculateKeyHash = function (locationInfo) {
        return this.deriveKey(locationInfo).then(function (aesKey) {
            return crypto.subtle.exportKey(keyFormat, aesKey).then(function (result) {
                return crypto.subtle.digest(hashType, result).then(function (hash) {
                    var keyHash = DataConvertionCalculations_1.DataConvertionCalculations.convertToHex(hash);
                    return keyHash;
                });
            });
        });
    };
    EncryptionHelper.prototype.decrypt = function (possibleLocation, cipherText, originalKeyHash) {
        var context = this;
        return this.deriveKey(possibleLocation).then(function (key) {
            return crypto.subtle.exportKey(keyFormat, key).then(function (rawKey) {
                return crypto.subtle.digest(hashType, rawKey).then(function (hash) {
                    var keyHash = DataConvertionCalculations_1.DataConvertionCalculations.convertToHex(hash);
                    if (keyHash == originalKeyHash) {
                        var ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(cipherText);
                        return crypto.subtle.decrypt({ name: encryptionAlgorithm, iv: context.ivBytes }, key, ciphertextBytes).then(function (plainTextBuffer) {
                            var plainTextBytes = new Uint8Array(plainTextBuffer);
                            var plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
                            var plainTextField = document.getElementById("cipherTextArea");
                            plainTextField.value = plaintextString;
                            return plaintextString;
                        });
                    }
                });
            });
        });
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
