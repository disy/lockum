"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EncryptionHelper_1 = require("../src/EncryptionHelper");
class Receiver {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    decryptMessage() {
        let salt = JSON.parse(localStorage.getItem("salt"));
        const str = localStorage.getItem("alal");
        const retrievedArr = str && JSON.parse(str);
        const retrievedTypedArray = new Uint8Array(retrievedArr);
        const str2 = localStorage.getItem("saltal");
        const retrievedArr2 = str && JSON.parse(str2);
        const retrievedTypedArray2 = new Uint8Array(retrievedArr2);
        let locationMaterial = JSON.parse(localStorage.getItem("readyLocation"));
        let ciphertextField = document.getElementById("ciphertextArea");
        let ciphertext = ciphertextField.value;
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(retrievedTypedArray2, retrievedTypedArray);
        encryptionTool.decrypt(ciphertext, locationMaterial);
    }
}
exports.Receiver = Receiver;
