"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
var NUMBEROFITERATIONS = 1000000;
var HASHTYPE = "SHA-256";
var HASHLENGTH = 256;
var KEYDERIVATIONALGORITHM = "PBKDF2";
var ENCRYPTIONALGORITHM = "AES-GCM";
var KEYLENGTH = 256;
var KEYFORMAT = "raw";
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper(salt, iv) {
        this.ivBytes = new Uint8Array(16);
        this.salt = new Uint8Array(16);
        this.salt = new Uint8Array(salt);
        this.ivBytes = new Uint8Array(iv);
    }
    EncryptionHelper.prototype.deriveKey = function (locationInfo) {
        var context = this;
        return window.crypto.subtle.importKey(KEYFORMAT, locationInfo, { name: KEYDERIVATIONALGORITHM, hash: HASHTYPE, length: HASHLENGTH }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: KEYDERIVATIONALGORITHM, salt: context.salt, iterations: NUMBEROFITERATIONS, hash: HASHTYPE }, baseKey, { name: ENCRYPTIONALGORITHM, length: KEYLENGTH }, true, ["encrypt", "decrypt"]);
        });
    };
    EncryptionHelper.prototype.encrypt = function (location, message, toleranceDistance) {
        var context = this;
        return this.deriveKey(location).then(function (aesKey) {
            var keyhash = context.calculateKeyHash(aesKey);
            var plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(message);
            var encryptedMessage = context.encryptMessage(aesKey, plainTextBytes);
            return Promise.all([keyhash, encryptedMessage, context.salt, context.ivBytes, toleranceDistance]);
        });
    };
    EncryptionHelper.prototype.encryptMessage = function (aesKey, plainTextBytes) {
        var context = this;
        return window.crypto.subtle.encrypt({ name: ENCRYPTIONALGORITHM, iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
            var ciphertextBytes = new Uint8Array(cipherTextBuffer);
            var base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
            return base64Ciphertext;
        });
    };
    EncryptionHelper.prototype.calculateKeyHash = function (aesKey) {
        return crypto.subtle.exportKey(KEYFORMAT, aesKey).then(function (result) {
            return crypto.subtle.digest(HASHTYPE, result).then(function (hash) {
                var keyHash = DataConvertionCalculations_1.DataConvertionCalculations.convertToHex(hash);
                return keyHash;
            });
        });
    };
    EncryptionHelper.prototype.decrypt = function (possibleLocation, cipherText, originalKeyHash) {
        var context = this;
        return this.deriveKey(possibleLocation).then(function (key) {
            var plainText = context.calculateKeyHash(key);
            return plainText.then(function (keyhash) {
                if (keyhash == originalKeyHash) {
                    var ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(cipherText);
                    return context.decryptMessage(key, ciphertextBytes).then(function (sonuc) {
                        return [sonuc, keyhash];
                    });
                }
            });
        });
    };
    EncryptionHelper.prototype.decryptMessage = function (aesKey, plainTextBytes) {
        var context = this;
        return window.crypto.subtle.decrypt({ name: ENCRYPTIONALGORITHM, iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
            var ciphertextBytes = new Uint8Array(cipherTextBuffer);
            var cipherTextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(ciphertextBytes);
            return cipherTextString;
        });
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
