"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
const EncryptionHelper_1 = require("../src/EncryptionHelper");
class Receiver {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    decryptMessage() {
        //get salt 
        const salt = localStorage.getItem("salt");
        const retrievedSaltArray = JSON.parse(salt);
        const saltBytes = new Uint8Array(retrievedSaltArray);
        //get iv
        const iv = localStorage.getItem("iv");
        const retrievedIvArray = JSON.parse(iv);
        const ivBytes = new Uint8Array(retrievedIvArray);
        //get ready location
        let toleranceDistance = parseInt(JSON.parse(localStorage.getItem("toleranceDistance")));
        console.log("tolerance distance will be:" + toleranceDistance);
        let rawLocation = new Location_1.Location(this.latitude, this.longitude);
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(toleranceDistance);
        //get ciphertext
        let ciphertextField = document.getElementById("messageToDecrypt");
        let ciphertext = ciphertextField.value;
        //decrypt the message
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(saltBytes, ivBytes);
        encryptionTool.decrypt(locationKeyMaterial, ciphertext);
    }
}
exports.Receiver = Receiver;
