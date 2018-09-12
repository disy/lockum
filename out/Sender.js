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
        let locationKeyMaterial = new Location_1.Location(this.latitude, this.longitude).createLocationKeyMaterial(this.toleranceDistance);
        let encryptionTool = new EncryptionHelper_1.EncryptionHelper(salt, ivBytes);
        encryptionTool.encrypt(locationKeyMaterial, this.message);
    }
}
exports.Sender = Sender;
