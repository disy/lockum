"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConvertionCalculations_1 = require("../src/DataConvertionCalculations");
var EncryptionHelper = /** @class */ (function () {
    function EncryptionHelper(salt, iv) {
        this.ivBytes = new Uint8Array(16);
        this.salt = salt;
        this.ivBytes = new Uint8Array(iv);
    }
    EncryptionHelper.prototype.deriveKey = function (locationInfo) {
        var numbefOfIterations = 1000000;
        var saltBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(this.salt);
        var locationInfoBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(locationInfo);
        return window.crypto.subtle.importKey("raw", locationInfoBytes, { name: "PBKDF2", hash: "SHA-1", length: 256 }, false, ["deriveKey"]).then(function (baseKey) {
            return window.crypto.subtle.deriveKey({ name: "PBKDF2", salt: saltBytes, iterations: numbefOfIterations, hash: "SHA-1" }, baseKey, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]);
        });
    };
    EncryptionHelper.prototype.encrypt = function () {
        var locationField = document.getElementById("locationField");
        var locationText = parseInt(locationField.value);
        var context = this;
        this.deriveKey(locationText).then(function (aesKey) {
            var plainTextField = document.getElementById("messageToEncrypt");
            var plainText = plainTextField.value;
            var plainTextBytes = DataConvertionCalculations_1.DataConvertionCalculations.stringToByteArray(plainText);
            window.crypto.subtle.encrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, plainTextBytes).then(function (cipherTextBuffer) {
                var ciphertextBytes = new Uint8Array(cipherTextBuffer);
                var base64Ciphertext = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToBase64(ciphertextBytes);
                var ciphertextField = document.getElementById("ciphertextArea");
                ciphertextField.value = base64Ciphertext;
            });
        });
    };
    EncryptionHelper.prototype.decrypt = function () {
        var locationField = document.getElementById("locationField");
        var locationText = parseInt(locationField.value);
        var context = this;
        this.deriveKey(locationText).then(function (aesKey) {
            var ciphertextField = document.getElementById("ciphertextArea");
            var ciphertextBase64String = ciphertextField.value;
            var ciphertextBytes = DataConvertionCalculations_1.DataConvertionCalculations.base64ToByteArray(ciphertextBase64String);
            window.crypto.subtle.decrypt({ name: "AES-CBC", iv: context.ivBytes }, aesKey, ciphertextBytes).then(function (plainTextBuffer) {
                var plainTextBytes = new Uint8Array(plainTextBuffer);
                var plaintextString = DataConvertionCalculations_1.DataConvertionCalculations.byteArrayToString(plainTextBytes);
                var keyField = document.getElementById("keyinputarea");
                keyField.value = plaintextString;
                console.log("sonuc" + plaintextString);
            });
        });
    };
    return EncryptionHelper;
}());
exports.EncryptionHelper = EncryptionHelper;
