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
        let iv = JSON.parse(localStorage.getItem("iv").toString());
        console.log(iv.toString().split(",")[2]);
        let ivBytes = new Uint8Array(16);
        for (let i = 0; i <= 15; i++) {
            ivBytes[i] = parseInt(iv.toString().split(",")[i]);
        }
        let locationMaterial = JSON.parse(localStorage.getItem("readyLocation"));
        let ciphertextField = document.getElementById("ciphertextArea");
        let ciphertext = ciphertextField.value;
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        encryptionTool.decrypt(ciphertext, locationMaterial);
    }
}
exports.Receiver = Receiver;
