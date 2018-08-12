"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Location_1 = require("./Location");
class Receiver {
    //  EncryptionTool = new EncryptionHelper(this.salt,DataConvertionCalculations.stringToByteArray(localStorage.getItem('iv')));
    constructor(latitude, longitude) {
        this.toleranceDistance = 5;
        this.salt = localStorage.getItem('salt');
        this.locationOfTheSender = new Location_1.Location(latitude, longitude).getCurrentLocation(this.toleranceDistance);
    }
    getCurrentLocation() {
        return this.locationOfTheSender;
    }
    decryptMessage() {
        //   this.EncryptionTool.decrypt();   
    }
}
exports.Receiver = Receiver;
