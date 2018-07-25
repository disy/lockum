"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper() {
        this.self = this;
        this.ivBytes = new Uint8Array(16);
    }
    EncryptionHelper.prototype.deriveKey = function (locationInfo) {
        var numbefOfIterations = 1000000;
        this.salt = "a";
        var saltBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(this.salt);
        var locationInfoBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(locationInfo);
        return window.crypto.subtle.importKey("raw", locationInfoBytes, { name: "PBKDF2", hash: "SHA-1", length: 256 }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: "PBKDF2", salt: saltBytes, iterations: numbefOfIterations, hash: "SHA-1" }, baseKey, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]);
        });
    };
    EncryptionHelper.prototype.encrypt = function () {
        var locationField = document.getElementById("locationField");
        var locationText = parseInt(locationField.value);
        this.deriveKey(locationText).then(function (aesKey) {
            console.log("derive key: " + aesKey);
            var plainTextField = document.getElementById("messageToEncrypt");
            var plainText = plainTextField.value;
            var ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
            var plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(plainText);
            window.crypto.subtle.encrypt({ name: "AES-CBC", iv: ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
                var ciphertextBytes = new Uint8Array(cipherTextBuffer);
                var base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                var ciphertextField = document.getElementById("ciphertextArea");
                ciphertextField.value = base64Ciphertext;
            });
        });
    };
    EncryptionHelper.prototype.decrypt = function () {
        console.log("salt valuemiz: " + this.salt);
        var locationField = document.getElementById("locationField");
        var locationText = parseInt(locationField.value);
        this.deriveKey(locationText).then(function (aesKey) {
            var ciphertextField = document.getElementById("ciphertextArea");
            var ciphertextBase64String = ciphertextField.value;
            var ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(ciphertextBase64String);
            window.crypto.subtle.decrypt({ name: "AES-CBC", iv: this.initializationVector }, aesKey, ciphertextBytes).then(function (plainTextBuffer) {
                var plainTextBytes = new Uint8Array(plainTextBuffer);
                var plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
                var keyField = document.getElementById("keyinputarea");
                keyField.value = plaintextString;
            });
        });
    };
    EncryptionHelper.prototype.shareCommonInfo = function (salt, iv) {
        var commonInfo;
        commonInfo = [salt, iv];
        return commonInfo;
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
