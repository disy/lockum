"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
const EncryptionHelper_1 = require("../src/EncryptionHelper");
class Sender {
    constructor(latitude, longitude, message) {
        this.toleranceDistance = 5;
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
    }
    encryptTheMessage() {
        this.locationOfTheSender = new Location_1.Location(this.latitude, this.longitude).getCurrentLocation(this.toleranceDistance);
        const ivBytes = window.crypto.getRandomValues(new Uint8Array(16));
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        this.EncryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        this.EncryptionTool.encrypt(this.message);
    }
}
exports.Sender = Sender;
