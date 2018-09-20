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
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(32));
        let rawLocation = new Location_1.Location(this.latitude, this.longitude);
        let locationKeyMaterial = rawLocation.createLocationKeyMaterial(this.toleranceDistance);
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        encryptionTool.encrypt(locationKeyMaterial, this.message);
        const arr = Array.from
            ? Array.from(ivBytes)
            : ivBytes.map(v => v);
        const str = JSON.stringify(arr);
        localStorage.setItem("alal", str);
        const arr2 = Array.from
            ? Array.from(salt)
            : ivBytes.map(v => v);
        const str2 = JSON.stringify(arr2);
        localStorage.setItem("saltal", str2);
        console.log("gonderirken saltimiz:" + str2);
        console.log("gonderirken ivVector:" + str);
        localStorage.setItem("salt", JSON.stringify(salt.toString()));
        localStorage.setItem("iv", JSON.stringify(ivBytes));
        localStorage.setItem("toleranceDistance", JSON.stringify(this.toleranceDistance));
        localStorage.setItem("readyLocation", JSON.stringify(locationKeyMaterial));
        //  localStorage.setItem("deneme",JSON.stringify(salt.toString()));
        //  let ahmetahmet = JSON.parse(localStorage.getItem("deneme"));
    }
}
exports.Sender = Sender;
