"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
const EncryptionHelper_1 = require("../src/EncryptionHelper");
class Sender {
    constructor(latitude, longitude, message, toleranceDistance) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
        this.toleranceDistance = toleranceDistance;
    }
    encryptMessage() {
        //prepare salt,iv
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(32));
        //get the raw location and include tolerance distance
        let rawLocation = new Location_1.Location(this.latitude, this.longitude);
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(this.toleranceDistance);
        //encrypt the message
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        encryptionTool.encrypt(locationKeyMaterial, this.message);
        //save salt,IV,tolerance Distance to browser
        const saltArray = Array.from(salt);
        const ivBytesArray = Array.from(ivBytes);
        const storedSalt = JSON.stringify(saltArray);
        const storedivBytesArray = JSON.stringify(ivBytesArray);
        localStorage.setItem("salt", storedSalt);
        localStorage.setItem("iv", storedivBytesArray);
        localStorage.setItem("toleranceDistance", JSON.stringify(this.toleranceDistance));
    }
}
exports.Sender = Sender;
