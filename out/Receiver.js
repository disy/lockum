"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
const EncryptionHelper_1 = require("../src/EncryptionHelper");
class Receiver {
    constructor(latitude, longitude, cipherText) {
        this.toleranceDistance = 5;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cipherText = cipherText;
    }
    decrypt() {
        let ciphertextField = document.getElementById("ciphertextArea");
        this.cipherText = ciphertextField.value;
        this.locationOfTheSender = new Location_1.Location(this.latitude, this.longitude).getCurrentLocation(this.toleranceDistance);
        var sharedPreferences = JSON.parse(localStorage.getItem('package'));
        console.log("ikinci taraf: " + sharedPreferences);
        this.EncryptionTool = new EncryptionHelper_1.EncryptionHelper(sharedPreferences[0], sharedPreferences[1]);
        this.EncryptionTool.decrypt(this.cipherText);
    }
}
exports.Receiver = Receiver;
